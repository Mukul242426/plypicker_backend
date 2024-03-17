import {Product} from '../models/productModel.js'
import { AppError } from '../utils/appError.js';

export const getAllProducts = async (req, res, next) => {
  
    try {
      const products=await Product.find({},{__v:0})
      res.status(200).json({
        success:true,
        results:products.length,
        products
      })
    } catch (error) {
      console.log(error)
      next(AppError(error.message, 400));
    }
  };

  export const getProduct = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findOne({ _id: id });
      if (!product) {
        return next(AppError("No such product exists", 400));
      }
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(AppError("Invalid product id", 400));
    }
  };

  export const editProduct = async (req, res, next) => {
    const { id } = req.params;
  
    const { productName,department,price,productDescription,image } = req.body;
  
    try {
      const product = await Product.findOneAndUpdate(
        { _id: id},
        { productName,department,price,productDescription,image },
        { runValidators: true }
      );
      if (!product) {
        return next("invalid product id", 400);
      }
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    } catch (error) {
      next(AppError(error.message, 400));
    }
  };