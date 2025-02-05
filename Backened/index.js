const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const jwt=require("jsonwebtoken")
var bodyParser=require("body-parser");
const multer=require("multer");
const path=require("path");
const app=express();
const productController=require('./controllers/productController')
const userController=require('./controllers/userController')

const PORT=8001;
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })




app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



mongoose.connect("mongodb://127.0.0.1:27017/campus-bazzar")
.then(()=>console.log("MongoDB Connected"));







app.get('/',(req,res)=>{
    res.send('Hello');
});

app.post('/like-product',userController.likeProduct)
app.post('/dislike-product',userController.dislikeProduct)
app.post('/signup',userController.Signup)

app.post('/login',userController.Login);
    
app.post('/add-product',upload.fields([{name:'pimage'},{name:'pimage1'},{name:'pimage2'},{name:'QR'}]), productController.addProduct)


app.get("/get-products",productController.getProducts)

app.post("/liked-product",userController.likedProducts)

app.get("/get-product/:id",productController.getProductById)

app.get('/search',productController.search)

app.get('/get-user/:userId',userController.getUserById);
app.post("/my-products",productController.myProducts)

 app.get('/my-profile/:userId',userController.myProfileId)
    
/
app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`));