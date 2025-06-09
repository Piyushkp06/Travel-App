import mongoose from "mongoose";
import { genSalt,hash } from "bcrypt";

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

    userSchema.pre("save",async function(next){
        const salt=await genSalt();
        this.password=await hash(this.password,salt);
        next();
    });

const User=mongoose.model("Users",userSchema);

export default User;