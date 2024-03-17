import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"product name is required"],
    },
    price:{
        type:String,
        required:[true,"price is required"]
    },
    image:{
        type:String,
        required:[true,"image is required"]
    },
    productDescription:{
        type:String,
        required:[true,"product description is required"]
    },
    department:{
        type:String,
        required:[true,"department is required"]
    },
    id:{
        type:"String",
    }
})

export const Product=mongoose.model('Product',productSchema)