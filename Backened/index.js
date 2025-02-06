const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const productController = require("./controllers/productController");
const userController = require("./controllers/userController");

const PORT = 8001;

// Ensure 'uploads/' directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://127.0.0.1:27017/campus-bazzar")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/like-product', userController.likeProduct);
app.post('/dislike-product', userController.dislikeProduct);
app.post('/signup', userController.Signup);
app.post('/login', userController.Login);

app.post('/add-product', upload.fields([
    { name: 'pimage', maxCount: 1 },
    { name: 'pimage1', maxCount: 1 },
    { name: 'pimage2', maxCount: 1 },
    { name: 'QR', maxCount: 1 }
]), (req, res, next) => {
    console.log("Received Request Body:", req.body);
    console.log("Received Files:", req.files);
    next();
}, productController.addProduct);

app.get("/get-products", productController.getProducts);
app.post("/liked-product", userController.likedProducts);
app.get("/get-product/:id", productController.getProductById);
app.get('/search', productController.search);
app.get('/get-user/:userId', userController.getUserById);
app.post("/my-products", productController.myProducts);
app.get('/my-profile/:userId', userController.myProfileId);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
