const {readFile, writeFile} = require("fs");
const filePath = "./temporary/fileB.txt";
const { names } = require("./04-names.js");

console.log('start');
writeFile(filePath,`Hey ${names.andrew}, I'm trying to reach ${names.john}. \n`,(error, result) => {
    if (error) {
        console.log(error);
        return; //null
    } else {
    writeFile(filePath,`Could you give me ${names.john}'s number? \n`,
      { flag: "a" }, (error, result) => {
        if (error) {
          console.log(error);
          return; //null
        }
        else {
        writeFile(filePath,`Awesome! Thank you so much ${names.andrew}! \n`,
        { flag: "a" },(error, result) => {
            if (error) {
            console.log(error);
            return; //null
            }
    
            readFile(filePath,'utf8', 
                (error, result) => {
                 if (error) {
                    console.log(error);
                    return;
                 }
                 console.log('Done with this task');
            });
        });
        } 
    });
    } 
});
console.log('Starting next task');
