const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pname: { type: String, required: true },
    pdesc: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    pimage: { type: String },
    pimage1: { type: String },
    pimage2: { type: String },
    QR: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId }
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
