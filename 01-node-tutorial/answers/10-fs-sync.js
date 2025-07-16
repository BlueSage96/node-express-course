const {readFileSync, writeFileSync} = require('fs');
const filePath = './temporary/fileA.txt';
const names = require('./04-names.js');

writeFileSync(filePath,`Here is the result ${names.peter}. \n`); 
writeFileSync(filePath,`${names.peter} did you send the results to ${names.paul}? \n`,{flag:'a'});
writeFileSync(filePath,`No? Let me try send it directly to ${names.paul}. \n`,{flag:'a'});

const output = readFileSync(filePath,'utf8');
console.log(output);