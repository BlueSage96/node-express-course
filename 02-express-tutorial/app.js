const express = require('express');
const path = require('path');
const app =  express();
const { products } = require("./data");

//setup static & middleware
app.use(express.static('./public')); //load html file from public folder
app.get('/',(req,res) => {
    console.log("Opening HTML page:", req.method, req.path);
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/about', (req,res) => {
    res.send('About Page')
});

app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It worked!"});
});

app.get("/api/v1/products", (req,res) => {
    res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);
    //error handling
    if (!product) {
        return res.status(404).send("<h1>That product was not found</h1>");
    } else {
         res.json(product);
    }
});

app.get("/api/v1/query", (req, res) => {
    const { search, limit, minPrice, maxPrice, regex } = req.query;
    let result = [...products];
    // search by name
    if (search) {
        result = result.filter(p => p.name.startsWith(search));
    }

    if (limit) {
        result = result.slice(0, parseInt(limit));
    }

    if (minPrice) {
        result = result.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
        result = result.filter(p => p.price < parseFloat(maxPrice));
    }

    if (regex) {
        const pattern = new RegExp(regex, "i");
        result = result.filter(((p) => pattern.test(p.name)));
    }
    res.json(result);
})

// Wildcard syntax for newer browsers
app.all(/.*/, (req,res) => {
    console.log('Getting 404 status', req.method, req.path);
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

console.log('Express Tutorial');