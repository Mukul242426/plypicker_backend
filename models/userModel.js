import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        minLength:[11,"Please provide a valid email id"],
        trim:true,
        unique:true,
        required:[true,"Email is required"],
    },
    password:{
        type:String,
        minLength:[8,"Weak Password"],
        trim:true,
        required:[true,"Password is Required"]
    },
    role:{
        type:String,
        enum: {
            values: ["admin", "team member"],
            message: "{VALUE} is not a valid role",
        },
        trim:true,
        required:[true,"role is required"]
    }
})

export const User=mongoose.model('User',userSchema)