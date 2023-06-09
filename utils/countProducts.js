fs = require("fs");

path = "/Users/sebastiancook/www/rec engine/rec-engine/data/sunglasses.json";

let file = JSON.parse(fs.readFileSync(path, "utf8"));

console.log(file.length);
