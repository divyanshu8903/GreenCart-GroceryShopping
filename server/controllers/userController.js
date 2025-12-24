

// register user : /api/user/register

import User from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register=async(req,res)=>{
  try {
    const {name,email,password}=req.body;

    if(!name || !email || !password){
      return res.json({success:false, message:"Missing Details"})
    }

    const existingUser=await User.findOne({email});
    if(existingUser) return res.json({success:false,message:"User already exists"})

    const hashPassword= await bcrypt.hash(password,10);

    const user= await User.create({name,email,password:hashPassword});

    const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie("token",token,{
      httpOnly : true,  // prevent javascript to access cookie
      secure:process.env.NODE_ENV==='production',//use secure cookies in production
      sameSite:process.env.NODE_ENV==='production'?"none":"strict", // csrf protection
    })
    
  } catch (error) {
    
  }
}