const langs = require('langs');
const franc = require('franc');

let input = process.argv[2];

let code = franc(input);

let lang = langs.where("3",code);

console.log(lang);