fs = require("fs");
path = "/Users/sebastiancook/www/rec engine/rec-engine/data/temp.json";

let file = JSON.parse(fs.readFileSync(path, "utf8"));

file.forEach((item, index) => {
  file[index].description = item.description.split("Material")[0];
})

fs.writeFileSync(path, JSON.stringify(file));

console.log(file);
