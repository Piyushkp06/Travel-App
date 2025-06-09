import { ApiError } from "../utils/ApiError.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import User from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import { compare } from "bcrypt";
import {renameSync,unlinkSync} from "fs"

const maxAge=3*24*60*60*1000;


const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validatePhone = (phone) => {
    const regex = /^(\+91|91)?[6-9]\d{9}$/;
    return regex.test(phone);
};

const createToken=(email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn:maxAge});
}
export const signup= async(request,response,next)=>{
    try{
        const {email,password,phone}=request.body;
        if(!email || !password || !phone){
            throw new ApiError(400,"Email, Password and Phone number are required");
        }

    if (!validateEmail(email)) {
        throw new ApiError(400,"Email is not valid");
    }
    if (!validatePhone(phone)) {
        throw new ApiError(400,"Phone number is not valid");
    }

        const user = await User.create({email, password,phone});

        response.cookie("jwt",createToken(email,user._id),{
            maxAge:3*24*60*60*1000,
            secure:true,
            httpOnly:true,
            sameSite:"None",

        });
        //console.log(response.cookie);
        return response.status(201).json({
            user:{
                id:user._id,
                email:user.email,
                phone:user.phone,
             profileSetup:user.profileSetup 
            },
        });

        
    }
    catch(error){
        console.log({error});
        throw new ApiError(500,"Internal Server Error");
    }
};

export const login= async(request,response,next)=>{
    try{
        const {email,password,phone}=request.body;
        if(!password || (!email && !phone)){
            throw new ApiError(400,"Password and either Email or Phone are required");
        }
        let user;
        if(email){
            if (!validateEmail(email)) {
                throw new ApiError(400,"Email is not valid");
            }
            user = await User.findOne({email});
        } else if(phone){
            if (!validatePhone(phone)) {
                throw new ApiError(400,"Phone number is not valid");
            }
            user = await User.findOne({phone});
        }
        if(!user){
            throw new ApiError(400,"User with the given email or phone not found");
        }
        const auth=await compare(password,user.password);
        if(!auth){
            throw new ApiError(400,"Password is incorrect");
        }
        response.cookie("jwt",createToken(user.email,user._id),{
            maxAge:3*24*60*60*1000,
            httpOnly:true,
            secure:true,
            sameSite:"None",
        });
        return response.status(200).json({
            user:{
                id:user._id,
                email:user.email,
                phone:user.phone,
                profileSetup:user.profileSetup ,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
            },
        });
    }
    catch(error){
        console.log({error});
        throw new ApiError(500,"Internal Server Error");
    }
};

export const getUserInfo= async(request,response,next)=>{
    try{
       const userData=await User.findById(request.userId);
       if(!userData){
        throw new ApiError(404,"User with given id not found");
       }
        return response.status(200).json({
             id:userData._id,
             email:userData.email,
             phone:userData.phone,
             profileSetup:userData.profileSetup ,
             firstName:userData.firstName,
             lastName:userData.lastName,
             image:userData.image,
        });            
    }
    catch(error){
        console.log({error});
        throw new ApiError(500,"Internal Server Error");
    }
};

export const updateProfile= async(request,response,next)=>{
    try{
       const {userId}=request;
       const {firstName,lastName,phone}=request.body;
       if(!firstName || !lastName || !phone){
        return response.status(404).send("Firstname, lastname, and phone are required")
       }
       if (!validatePhone(phone)) {
            return response.status(400).send("Phone number is not valid");
       }
       const userData =await User.findByIdAndUpdate(
        userId,{
            firstName,
            lastName,
            phone,
            profileSetup:true,
        },
        {new:true,runValidators:true}
       );
        return response.status(200).json({
             id:userData._id,
             email:userData.email,
             phone:userData.phone,
             profileSetup:userData.profileSetup ,
             firstName:userData.firstName,
             lastName:userData.lastName,
             image:userData.image,
        });            
    }
    catch(error){
        console.log({error});
        throw new ApiError(500,"Internal Server Error");
    }
};

export const addProfileImage= async(request,response,next)=>{
    try{
       if(!request.file){
        throw new ApiError(400,"File is required");
       }
       const date=Date.now();
       let fileName="uploads/profiles/"+date+request.file.originalname;
       renameSync(request.file.path,fileName);

       const updatedUser=await User.findByIdAndUpdate(
        request.userId,
        {image:fileName},
        {new:true,runValidators:true}
    );

        return response.status(200).json({
        image:updatedUser.image,
        });            
    }
        catch(error){
        console.log({error});
        throw new ApiError(500,"Internal Server Error");
    }
};

export const removeProfileImage= async(request,response,next)=>{
    try{
       const {userId}=request;
       const user=await User.findById(userId);
       if(!user){
        throw new ApiError(404,"User not found.")
       }

       if(user.image){
        unlinkSync(user.image);
      }
      user.image=null;
      await user.save();
      
        return response.status(200).send("Profile Image Removed Successfully");    
    }
        catch(error){
        console.log({error});
        throw new ApiError(500,"Internal Server Error");
    }
};

export const Logout= async(request,response,next)=>{
    try{
         response.cookie("jwt","",{maxAge:1,secure:true,sameSite:"None"})
        return response.status(200).send("Logout Successfully");    
    }
        catch(error){
        console.log({error});
        throw new ApiError(500,"Internal Server Error");
    }
};