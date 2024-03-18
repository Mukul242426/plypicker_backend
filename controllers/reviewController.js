import {Review} from '../models/reviewModel.js'
import { AppError } from '../utils/appError.js';

export const mySubmissions=async(req,res,next)=>{

    const user=req.user;

    try{
        const pending=await Review.find({author:user._id,status:'pending'})
        const approved=await Review.find({author:user._id,status:'approved'})

        const rejected=await Review.find({author:user._id,status:'rejected'})

        res.status(200).json({
            success:true,
            pending,
            approved,
            rejected
        })

    }catch(error){
        console.log(error)
        next(AppError(error.message,400))

    }
}

export const getProfileStats=async(req,res,next)=>{

    const user=req.user;

    try{
        if(user.role==="admin"){
            const pending=await Review.find({adminId:user._id,status:"pending"})
            const approved=await Review.find({adminId:user._id,status:"approved"})
            const rejected=await Review.find({adminId:user._id,status:"rejected"})

            res.status(200).json({
                success:true,
                pending:pending.length,
                approved:approved.length,
                rejected:rejected.length
            })
        }
        else{
            const pending=await Review.find({author:user._id,status:"pending"})
            const approved=await Review.find({author:user._id,status:"approved"})
            const rejected=await Review.find({author:user._id,status:"rejected"})

            res.status(200).json({
                success:true,
                pending:pending.length,
                approved:approved.length,
                rejected:rejected.length
            })

        }

    }catch(error){
        console.log(error)
        next(AppError(error.message,400))
    }
}

export const getPendingRequest=async(req,res,next)=>{

    const user=req.user;

    try{
        const pending=await Review.find({adminId:user._id,status:"pending"})
        res.status(200).json({
            success:true,
            results:pending.length,
            pending
        })

    }catch(error){
        console.log(error)
        next(AppError(error.message,400))
    }
}

export const getRequestInfo=async(req,res,next)=>{

    const {id}=req.params;

    try{
        const requestInfo=await Review.findOne({_id:id})
        res.status(200).json({
            success:true,
            requestInfo
        })

    }catch(error){
        console.log(error)
        next(AppError(error.message,400))
    }
}

export const updateStatus=async(req,res,next)=>{

    const {status}=req.body;

    const {id}=req.params;

    try{
        const updatedStatus=await Review.findOneAndUpdate({_id:id},{status},{new:true})
        res.status(200).json({
            success:true,
            message:`Request ${status} successfully`
        })

    }catch(error){
        console.log(error)
        next(AppError(error.message,400))
    }
}