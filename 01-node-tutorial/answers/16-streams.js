const { createReadStream } = require('fs');
const stream = createReadStream('../content/big.txt', {encoding: 'utf8', highWaterMark: 200});
let dataCounter = 0;

stream.on('data', (result) => {
    dataCounter ++;
    console.log(result);
});

stream.on('end', () => {
    console.log(`Chunks received: ${dataCounter}`);
})
stream.on('error', (err) => console.log(err));