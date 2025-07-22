const { writeFile, readFile } = require("fs").promises;
const filePath = "./temporary/temp.txt";
const { names } = require("./04-names.js");

writeFile(filePath,`Here is the result of the test, ${names.judas}. \n`)
.then(() => {
    return writeFile(filePath, `${names.judas}, did you send the results to ${names.jude}? \n`,{flag:'a'})
})
.then(() => {
    return writeFile(filePath, `No? Let me try to send it to ${names.jude}. \n`,{flag:'a'});
})
.then(() => {
    return readFile(filePath,'utf8');
})
.then((result) => {
    console.log(result);
})