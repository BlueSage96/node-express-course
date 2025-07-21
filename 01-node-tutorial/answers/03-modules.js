const { names } = require("./04-names.js");
const greetNames = require("./05-utils.js");
const data = require("./06-alternative-flavor");

console.log(data);
greetNames(names.matthew);
greetNames(names.james1);
require('./07-mind-grenade');