/*
    Get: read data
    Post: insert data
    Put: update data
    Delete: delete data
*/

const express = require("express");
const router = express.Router();
const { getProducts, getProductID, queryProducts } = require("../controllers/products.js");

router.route('/').get(getProducts);
router.route('/query').get(queryProducts);
// dynamic parameter needs to go last!
router.route('/:productID').get(getProductID);

module.exports = router;