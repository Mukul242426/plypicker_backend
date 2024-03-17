import express from 'express'
import {getAllProducts,getProduct} from '../controllers/productController.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router=express.Router()

router
  .route("/")
  .get(isAuthenticated,getAllProducts)

router
  .route("/:id")
  .get(isAuthenticated,getProduct)  

export default router;