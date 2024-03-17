import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    status:{
        type:String,
        enum:{
            values:["pending","approved","rejected"],
            message: "{VALUE} is not a valid role"
        },
        default:"pending"
    },
    author:String,
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

export const Review=mongoose.model('Review',reviewSchema)