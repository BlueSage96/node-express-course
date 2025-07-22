const {names, numbers} = require("./04-names.js");
const EventEmitter = require("events");
const emitter = new EventEmitter();

const getDisciples = () => {
    return new Promise((resolve) => {
        emitter.on("The names of Jesus' 12 disciples are:", (msg) => resolve(msg));
    });
};

const logDisciples = async () => {
    const msg = await getDisciples();
    msg.map((name,idx) => console.log(`${numbers[idx]} ${name}`));
};

logDisciples();
console.log("The names of Jesus' 12 disciples are: ");
const getNames = Object.values(names).sort();//print names 1 per line
emitter.emit("The names of Jesus' 12 disciples are:", getNames);