import jwt from "jsonwebtoken";
import { AppError} from "../utils/appError.js";
import { User } from "../models/userModel.js";
import { Review } from "../models/reviewModel.js";
import { changedFields } from "../utils/changedField.js";
import { Product } from "../models/productModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    let jwttoken = req.headers.authorization;
   
    if (!jwttoken) {
      return next(AppError("Please provide a valid token", 400));
    }
    jwttoken=jwttoken.slice(7)
    const {userId} = jwt.verify(jwttoken,process.env.SECRET_KEY);
    const user=await User.findOne({_id:userId});
    if(!user){
      next(AppError("You are not logged in !! Please login",400))
    }
    req.user=user;
    next();
  } catch (error) {
    next(AppError("You are not logged in !! Please login", 400));
  }
};

export const isAuthorized=async(req,res,next)=>{

  const user=req.user;

  console.log(req.body)

  try{

    if(user.role!=="admin"){

      const originalObj= await Product.findOne({_id:req.body._id});

      const suggestedChanges=changedFields(originalObj.toObject(),req.body)

      console.log("suggested changes is",suggestedChanges)

      if(Object.keys(suggestedChanges).length===0){
        return next(AppError("You need to edit something",400))
      }

      suggestedChanges.id=originalObj._id

      const admin=await User.findOne({role:"admin"})

      const review= await Review.create({
        author:user._id,
        authorsMail:user.email,
        adminId:admin._id,
        productName:originalObj.productName,
        suggestedChanges
      })

      return res.status(200).json({
        success:true,
        message:"Submitted for review successfully",
        review
      })
    }
    next()
  }catch(error){
    console.log(error)
  }
}

export const isTeamMember=async(req,res,next)=>{
  const user=req.user;

  if(user && user.role==="team member"){
    next()
  }
  else{
    next(AppError("You are not authorized",400))
  }
}

export const isAdmin=async(req,res,next)=>{
  const user=req.user;

  if(user && user.role==="admin"){
    next()
  }
  else{
    next(AppError("You are not authorized",400))
  }
}
