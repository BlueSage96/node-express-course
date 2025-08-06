const express = require("express");
const { products } = require("../data");

const getProducts = (req, res) => {
    res.status(200).json({ success: true, data: products });
}

const getProductID = (req, res) => {
     const idToFind = parseInt(req.params.productID);
     const product = products.find((p) => p.id === idToFind);
     //error handling
     if (!product) {
       return res.status(404).send("<h1>That product was not found</h1>");
     } else {
       res.json(product);
     }
}

const queryProducts = (req, res) => {
     const { search, limit, minPrice, maxPrice, regex } = req.query;
     let result = [...products];
     // search by name
     if (search) {
       result = result.filter((p) => p.name.startsWith(search));
     }

     if (limit) {
       result = result.slice(0, parseInt(limit));
     }

     if (minPrice) {
       result = result.filter((p) => p.price >= parseFloat(minPrice));
     }

     if (maxPrice) {
       result = result.filter((p) => p.price < parseFloat(maxPrice));
     }

     if (regex) {
       const pattern = new RegExp(regex, "i");
       result = result.filter((p) => pattern.test(p.name));
     }
     res.json(result);
}

module.exports = { getProducts, getProductID, queryProducts };