const bcrypt = require('bcrypt');
const mongoose=require('mongoose');
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    
    Username:{
        type:String,
        required:true,
    },
    EnrollNo:{
        type:String,
        required:true,

    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    likedProducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products',
        }
    ],
})
const Users=mongoose.model('Users',userSchema);


module.exports.likeProduct=async (req,res)=>{
    let productId=req.body.productId;
    let userId=req.body.userId;
   
   await Users.updateOne({_id:userId},{$addToSet:{likedProducts:productId}}).
   then(()=>{
    res.send({message:'saved success'});
})
.catch(()=>{
    res.send({message:'server err'})
})
}


module.exports.dislikeProduct=async (req,res)=>{
    let productId=req.body.productId;
    let userId=req.body.userId;
   
   await Users.updateOne({_id:userId},{$pull:{likedProducts:productId}}).
   then(()=>{
    res.send({message:'saved success'});
})
.catch(()=>{
    res.send({message:'server err'})
})
}

module.exports.Signup = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await Users.create({
            Username: username,
            EnrollNo: req.body.EnrollNo,
            mobile: req.body.mobile,
            email: req.body.email,
            password: hashedPassword, // Store hashed password in the database
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" });
    }
}

// Update Login function
module.exports.Login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ Username: username });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Compare hashed password with provided password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send({ message: "Password wrong" });
        }

        const token = jwt.sign({ data: user }, 'MYKEY', { expiresIn: '1h' });

        return res.send({ message: "Login success", token: token, userId: user._id });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" });
    }
}

module.exports.likedProducts=async (req,res)=>{
    await Users.findOne({_id:req.body.userId}).populate('likedProducts')
   .then((result)=>{
      
         res.send({message:"product found", products:result.likedProducts})
         })
         .catch((err)=>{
             res.send({message:'server error'})
     })
 }

 module.exports.myProfileId=async (req,res)=>{
    let uid=req.params.userId;
 
    await Users.findOne({_id:uid})
    .then((result)=>{
       
     res.send({message:"User found", user:{email:result.email,mobile:result.mobile,Username:result.Username,EnrollNo:result.EnrollNo}})
     })
     .catch((err)=>{
         res.send({message:'server error'})
 })
  }

  module.exports.getUserById=async (req,res)=>{
    const _userId=req.params.userId;
    
    await Users.findOne({_id:_userId}).then((result)=>{

        
        res.send({message:'success',user:{email:result.email,mobile:result.mobile,Username:result.Username,EnrollNo:result.EnrollNo}})
  })
     .catch(()=>{
    res.send({message:"server error"})
});

}