import jwt from "jsonwebtoken";
import { AppError} from "../utils/appError.js";
import { User } from "../models/userModel.js";
import { Review } from "../models/reviewModel.js";

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

  try{

    if(user.role!=="admin"){

      const admin=await User.findOne({role:"admin"})

      const review= await Review.create({
        author:user.email,
        adminId:admin._id
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
