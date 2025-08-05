const express = require('express');
const path = require('path');
const app =  express();
const peopleRouter = require("./routes/people");
const productRouter = require("./routes/products");
const { products, people } = require("./data");

const logger = (req,res,next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next();
}
//setup static & middleware
app.use([express.static('./public'), logger ]); //load html file from public folder

// req => middleware => res
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/about', (req,res) => {
    res.send('About Page');
});

// for parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API stuff
app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/products", productRouter);

app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It worked!"});
});

// Wildcard syntax for newer browsers
app.all(/.*/, (req,res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});