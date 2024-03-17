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
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    authorsMail:String,
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    productName:String,
    suggestedChanges:Object
})

export const Review=mongoose.model('Review',reviewSchema)