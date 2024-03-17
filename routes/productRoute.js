import express from 'express'
import {getAllProducts,getProduct,editProduct} from '../controllers/productController.js'
import { isAuthenticated, isAuthorized } from '../middlewares/auth.js'

const router=express.Router()

router
  .route("/")
  .get(isAuthenticated,getAllProducts)

router
  .route("/:id")
  .get(isAuthenticated,getProduct)
  .put(isAuthenticated,isAuthorized,editProduct)  

export default router;