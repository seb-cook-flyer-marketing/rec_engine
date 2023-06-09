import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import puppeteer from "puppeteer";
const url = "https://www.primark.com/en-gb/c/men/accessories/sunglasses";

const path = "/Users/sebastiancook/www/rec engine/rec-engine/data/temp.json";

const scrapData = async (url: string) => {
  const _url = new URL(url).toString();
  let products = [] as any[];
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  const getDetails = async (links: string[]) => {
    console.log(links);
    for (const link of links) {
      const productPage = await browser.newPage();
      await Promise.all([
        await productPage
          .goto(link, {
            waitUntil: ["load", "networkidle2"],
          })
          .catch((err) => console.log(err)),
        await productPage.content().then(
          async (html) =>
            await extractProductData(html, link)
              .then((data) => {
                fetch("http://localhost:3000/testfs/api", {
                  method: "POST",
                  body: JSON.stringify(data),
                });
                products.push(data);
              })
              .then(() => productPage.close())
        ),
      ]);
    }
  };

  /*links = [
    "https://www.primark.com/en-gb/p/tinted-rectangular-sunglasses-green-991059831414",
  ];*/
  //links = await extractLinkData(content);

  //Testing link
  Promise.all([
    await page.goto(_url, { waitUntil: "networkidle2" }),
    await page.waitForSelector("div[class='MuiContainer-root'"),
    await page.click("button[id='onetrust-accept-btn-handler']"),
  ]);

  let content = null;
  let links = [] as string[];

  const handleLoadMore = async () => {
    let isMore = true;
    while (isMore) {
      await page
        .$eval("a[data-testautomation-id='load-more-button'", async (el) => {
          return el.click();
        })
        .catch((err) => (isMore = false));
    }
  };

  Promise.all([
    await handleLoadMore(),
    await new Promise((r) => setTimeout(r, 10000)),
    (content = await page.content()),
    (links = await extractLinkData(content)),
    await getDetails(links),
  ]);
  browser.close();
  return products;
};

const extractLinkData = async (html: string) => {
  const $ = load(html);

  const productLinks = [] as string[];

  $(
    "div[class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-sm-4 MuiGrid-grid-md-4 MuiGrid-grid-lg-4 MuiGrid-grid-xl-3']"
  ).each(function (i, elements) {
    productLinks.push(
      "https://www.primark.com" + $(this).find("a").attr("href")
    );
  });

  return productLinks;
};

const extractProductData = async (html: string, link: string) => {
  const productData = {
    title: "",
    subtitle: "",
    price: "",
    colors: [],
    image: "",
    url: "",
  } as any;

  const $ = load(html);
  $("div[data-testautomation-id='pdp-page']").each(function (i, el) {
    const colors = [] as string[];
    productData.title = $(el)
      .find("h1[data-testautomation-id='product-title']")
      .text()
      .trim();
    productData.subtitle = $(el)
      .find("h5[data-testautomation-id='product-description']")
      .text()
      .trim();
    productData.price = $(el)
      .find("p[data-testautomation-id='product-price']")
      .text()
      .trim();
    $("div[data-testautomation-id='gallery']")
      .find("a")
      .each(function (index, el) {
        const color = $(el).find("img").attr("title");
        color && colors.push(color);
      });
    productData.image = $(el).find("img").attr("src");
    productData.description = $("div[data-testautomation-id='details']")
      .find("p[data-testautomation-id='typography']")
      .text()
      .trim();
    productData.url = link;
    productData.colors = colors;
    productData.gender = $("nav[data-testautomation-id='breadcrumbs']")
      .find("ol > li > a")
      .eq(0)
      .text()
      .trim();
    productData.category = $("nav[data-testautomation-id='breadcrumbs']")
      .find("ol > li > a")
      .eq(1)
      .text()
      .trim();
    productData.subcategory = $("nav[data-testautomation-id='breadcrumbs']")
      .find("ol > li > a")
      .eq(2)
      .text()
      .trim();

    return productData;
  });

  return productData;
};

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  console.log(query);

  if (query) {
    const response = await scrapData(query);
    return new Response(
      JSON.stringify({ data: response, count: response.length })
    );
  }
  return null;
}
