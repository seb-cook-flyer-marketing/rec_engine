"use client";
import { useState, useCallback, useEffect } from "react";
import { SSE } from "sse.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { ElementContent } from "react-markdown/lib/ast-to-react";

type Product = {
  url: string;
  image: string;
  description: string;
};

export default function Chat(): React.ReactElement {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const cantHelp =
    answer?.trim() === "Sorry, I don't know how to help with that yet.";
  const status = isLoading
    ? "Optimus Primark is searching..."
    : isResponding
    ? "Optimus Primark is responding..."
    : cantHelp || hasError
    ? "Optimus Primark is has failed you"
    : undefined;

  const handleConfirm = useCallback(async (query: string) => {
    setHasError(false);
    setAnswer(undefined);
    setIsLoading(true);

    const eventSource = new SSE(`/query/api?query=${query}`);

    function handleError<T>(err: T) {
      setIsLoading(false);
      setIsResponding(false);
      setHasError(true);
      console.error(err);
    }

    eventSource.addEventListener("error", handleError);
    eventSource.addEventListener("message", (e) => {
      try {
        setIsLoading(false);

        if (e.data === "[DONE]") {
          setIsResponding(false);
          return;
        }

        setIsResponding(true);

        const completionResponse: any = JSON.parse(e.data);
        const [
          {
            delta: { content },
          },
        ] = completionResponse.choices;

        console.log(content);

        setAnswer((answer) => {
          console.log(answer);
          if (content !== undefined) {
            return (answer ?? "") + content;
          }
          return answer;
        });
      } catch (err) {
        handleError(err);
      }
    });

    eventSource.stream();

    setIsLoading(true);
  }, []);

  function handleResetPrompt() {
    setQuery("");
    setAnswer(undefined);
    setIsResponding(false);
    setHasError(false);
  }

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div
      className={`mx-auto max-h-full flex flex-col gap-4 rounded-lg p-4 md:pt-6 md:px-6 pb-2 w-full overflow-hidden border text-left border-scale-500 cursor-auto relative min-w-[340px]`}
    >
      <input
        className="input input-primary"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="I am Optimus Primark your personal shopping assistant here to help."
        onKeyDown={(e) => {
          switch (e.key) {
            case "Enter":
              handleConfirm(query);
              return;
            default:
              return;
          }
        }}
      ></input>
      {isLoading ||
        hasError ||
        (isResponding && (
          <div className="text-sm text-scale-500 dark:text-scale-300">
            {status}
          </div>
        ))}
      {answer && (
        <div className="text-sm text-scale-500 dark:text-scale-300">
          <ReactMarkdown
            className="space-y-3"
            remarkPlugins={[remarkGfm]}
            components={{
              p({ node, ...props }) {
                return <p className="text-base" {...props} />;
              },
              img({ src, alt, title }) {
                return (
                  <figure>
                    <Image
                      src={src!}
                      alt={alt!}
                      title={title}
                      className="rounded max-w-[300px] max-h-[300px] object-contain"
                      width={300}
                      height={300}
                    />
                    <button className="btn btn-outline" type="button">
                      Buy Now
                    </button>
                  </figure>
                );
              },
              ol({ node, ...props }) {
                return (
                  <ol className="list-none" {...props}>
                    <div className="space-y-10">{props.children}</div>
                  </ol>
                );
              },
              li({ node, ...props }) {
                node &&
                  node.children &&
                  node.children.map((child) => {
                    switch (child.type) {
                      case "text":
                        break;
                      case "element": {
                        child.children &&
                          child.children.map((child1, index) => {
                            switch (child1.type) {
                              case "text":
                                setProducts((products) => [
                                  ...products,
                                  (products[index] = {
                                    url: "",
                                    description: child1.value,
                                    image: "",
                                  }),
                                ]);
                              case "element": {
                                child.children &&
                                  child.children.map((child2: any) => {
                                    switch (child2.tagName) {
                                      case "a":
                                        break;
                                      case "img":
                                        return (
                                          <Image
                                            src={child2.properties.src}
                                            alt={child2.properties.alt}
                                            title={child2.properties.title}
                                          />
                                        );
                                    }
                                  });
                              }
                            }
                          });
                      }
                    }
                  });
                return (
                  <li className="text-base space-y-3 list-item" {...props}>
                    <div className="card card-compact w-96 bg-base-100 shadow-xl">
                      <div className="card-body">{props.children}</div>
                    </div>
                  </li>
                );
              },
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
