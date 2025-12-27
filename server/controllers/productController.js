import {v2 as cloudinary} from  "cloudinary";

import Product from "../models/Product.js"
 
// Add Product : /api/product/add
export  const addProduct = async(req,res)=>{
    try {
      let productdata=JSON.parse(req.body.productdata)

      const image =req.files
      
      let imagesUrl=await Promise.all(
        images.map(async(items)=>{
          let result =await cloudinary.uploader.upload(item.path,{resource_type:"image"});
          return result.secure_url;
        })
      )

      await Product.create({...productdata,image:imagesUrl})

      res.json({success:true,message:"Product Added"})

    } catch (error) {
      console.log(error.message);
      res.json({success:false,message:error.message})
      
    }
}

// Get Product : /api/product/list
export  const productList = async(req,res)=>{
  try {
    const products = await Product.find({});
    res.json({success:true,products})
  } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
      
  }
}

// Get single Product : /api/product/id
export  const productById = async(req,res)=>{
  try {
    const {id}=req.body
    const products = await Product.findById({id})
     res.json({success:true,products})
  } catch (error) {
     console.log(error.message);
    res.json({success:false,message:error.message})
  }
}

// Change Product inStock : /api/product/stock
export  const changeStock = async(req,res)=>{
  try {
    const {id, inStock}=req.body
    await Product.findByIdAndUpdate(id,{inStock});
    res.json({success:true,message:"Stock Updated"})
  } catch (error) {
     console.log(error.message);
    res.json({success:false,message:error.message})
  }
}