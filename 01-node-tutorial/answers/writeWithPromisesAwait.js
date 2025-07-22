const { writeFile, readFile } = require("fs").promises;
const filePath = ('./temporary/temp.txt');
const writer = async () => {
    try {
        const { names } = require('./04-names.js');
        await writeFile(filePath,`Here is the result of the test, ${names.phillip}. \n`);
        await writeFile(filePath, `${names.phillip}, did you send the results to ${names.simon}? \n`,{flag:'a'});
        await writeFile(filePath, `No? Let me try to send it to ${names.simon}. \n`,{flag:'a'});
    }
    catch(error){
        console.log("An error occurred: ", error);
    }
}

const reader = async() => {
    try {
        const output = await readFile(filePath, 'utf8');
        console.log(output);
    } 
    catch(error) {
        console.log("Error occurred when trying to read file: ", error);
    }
}

const readWrite = async() => {
    try {
        await writer();
        await reader();
    }
    catch (error) {
        console.log("Unable to read or write: ", error);
    }
}

readWrite();