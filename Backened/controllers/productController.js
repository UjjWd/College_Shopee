const mongoose = require('mongoose');
const Products = require('../models/productModel'); // Moved schema to a separate file for better structure

module.exports.addProduct = async (req, res) => {
    try {
        console.log("Uploaded Files:", req.files);

        await Products.create({
            pname: req.body.pname,
            pdesc: req.body.pdesc,
            price: req.body.price,
            category: req.body.category,
            pimage: req.files?.pimage?.[0]?.path || "",
            pimage1: req.files?.pimage1?.[0]?.path || "",
            pimage2: req.files?.pimage2?.[0]?.path || "",
            QR: req.files?.QR?.[0]?.path || "",
            addedBy: req.body.userId,
        });

        res.send({ message: "Product added successfully" });
    } catch (err) {
        console.error("Error in addProduct:", err);
        res.status(500).send({ message: "Server error" });
    }
};

module.exports.getProducts = async (req, res) => {
    try {
        const catName = req.query.catName;
        let filter = catName ? { category: catName } : {};
        const products = await Products.find(filter);
        res.send({ message: "Products found", products });
    } catch (err) {
        console.error("Error in getProducts:", err);
        res.status(500).send({ message: "Server error" });
    }
};

module.exports.getProductById = async (req, res) => {
    try {
        const product = await Products.findOne({ _id: req.params.id });
        res.send({ message: "Product found", product });
    } catch (err) {
        console.error("Error in getProductById:", err);
        res.status(500).send({ message: "Server error" });
    }
};

module.exports.search = async (req, res) => {
    try {
        let search = req.query.search;
        const results = await Products.find({
            $or: [
                { pname: { $regex: search, $options: "i" } },
                { pdesc: { $regex: search, $options: "i" } },
                { price: { $regex: search, $options: "i" } },
            ]
        });

        res.send({ message: "Search success", product: results });
    } catch (err) {
        console.error("Error in search:", err);
        res.status(500).send({ message: "Server error" });
    }
};

module.exports.myProducts = async (req, res) => {
    try {
        const userId = req.body.userId;
        const products = await Products.find({ addedBy: userId });
        res.send({ message: "Products found", products });
    } catch (err) {
        console.error("Error in myProducts:", err);
        res.status(500).send({ message: "Server error" });
    }
};
