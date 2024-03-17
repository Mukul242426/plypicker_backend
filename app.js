import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { AppError } from "./utils/appError.js"
import { globalErrorHandler } from "./middlewares/error.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cors from 'cors'
import axios from 'axios'
import { Product } from "./models/productModel.js"

const app=express()

app.use(cors({ origin: "*"}));

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Everything's fine"    
    })
})

app.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is up and running"
    })
})

app.use('/api/v1',userRouter)
app.use('/api/v1/product',productRouter)

app.all('*',(req,res,next)=>{
    next(AppError(`cant find ${req.originalUrl} on this server`,400))
})

app.use(globalErrorHandler)

app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(async() => {
        console.log('Connected to MongoDB');

        await Product.deleteMany({});

        axios.get('https://64e0caef50713530432cafa1.mockapi.io/api/products')
            .then(response => {
                // Iterate over fetched products and save them to the database
                response.data.forEach(productData => {
                    const {productName,price,image,productDescription,department,id}=productData;
                    const product = new Product({
                        productName,
                        price,
                        image,
                        productDescription,
                        department,
                        id
                    });
                    product.save()
                        .then(() => console.log('Product is:', product))
                        .catch(error => console.error('error is:', error));
                });
            })
            .catch(error => console.error('error is due to', error));
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));
})