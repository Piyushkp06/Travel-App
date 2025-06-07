import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    image:{
        type:String,
        required:false,
    },
    profileSetup:{
        type:Boolean,
        default:false,
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      }]
    }, { timestamps: true });
const User=mongoose.model("Users",userSchema);

export default User;