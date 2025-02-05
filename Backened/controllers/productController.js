
const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    pname:{
        type:String,
        required:true,
    },
    pdesc:{
        type:String,
        required:true,

    },
    price:{
        type:String,
        required:true,

    },
    category:{
        type:String,
        required:true,

    },
    pimage:{
        type:String,
    },
    pimage1:{
        type:String,
    },
    pimage2:{
        type:String,
        
    },
    QR:{
        type:String,
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
   

    }
})
const Products=mongoose.model("Products",productSchema);


module.exports.search=async (req,res)=>{

    let search=req.query.search;
    await Products.find({
        $or:[
            {
            pname:{$regex:search}
            },
            {
                pdesc:{$regex:search}
            },
            {
                price:{$regex:search}
            },
        ]
    }
    )
    .then((results)=>{
     
        res.send({message:"success", product:results})
        })
        .catch((err)=>{
            res.send({message:'server error'})
    })

}

module.exports.addProduct=async (req,res)=>{
   
    await Products.create({
       pname:req.body.pname,
       pdesc:req.body.pdesc,
       price:req.body.price,
       category:req.body.category,
       pimage:req.files.pimage[0].path,
       pimage1:req.files.pimage1[0].path,
       pimage2:req.files.pimage2[0].path,
       QR:req.files.QR[0].path,
       addedBy:req.body.userId,
    }).then((result)=>
{
    res.send({message:"product added successfully"});
}).catch((err)=>{
    res.send({message:'server error'})
})
    
   
}

module.exports.getProducts=async (req,res)=>{
    const catName=req.query.catName;
    
    let   _f={};
    if(catName)
    {
        _f={category:catName}
    }
    await Products.find(_f)
    .then((result)=>{
     
        res.send({message:"product found", products:result})
        })
        .catch((err)=>{
            res.send({message:'server error'})
    })
}

module.exports.getProductById=async (req,res)=>{
   
    await Products.findOne({_id:req.params.id})
    .then((result)=>{
     
        res.send({message:"product found", product:result})
        })
        .catch((err)=>{
            res.send({message:'server error'})
    })
}

module.exports.myProducts=async (req,res)=>{
    const userId=req.body.userId;
   Products.find({addedBy:userId})
   .then((result)=>{
      
         res.send({message:"product found", products:result})
         })
         .catch((err)=>{
             res.send({message:'server error'})
     })
 }