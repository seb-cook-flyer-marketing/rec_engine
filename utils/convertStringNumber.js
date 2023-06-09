fs = require("fs");
path = "/Users/sebastiancook/www/rec engine/rec-engine/data/temp.json";

let file = JSON.parse(fs.readFileSync(path, "utf8"));

file.forEach((item, index) => {
  file[index].price = parseFloat(item.price).toFixed(2);
});

fs.writeFileSync(path, JSON.stringify(file));
