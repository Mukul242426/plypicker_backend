import express from 'express'
import {mySubmissions,getProfileStats,getPendingRequest,getRequestInfo, updateStatus} from '../controllers/reviewController.js'
import { isAdmin, isAuthenticated, isAuthorized, isTeamMember } from '../middlewares/auth.js';

const router=express.Router()

router
  .get('/',isAuthenticated,isTeamMember,mySubmissions)
  .get('/profile',isAuthenticated,getProfileStats)
  .get('/pending/request',isAuthenticated,isAdmin,getPendingRequest)
  .get('/pending/request/:id',isAuthenticated,isAdmin,getRequestInfo)

router
  .patch('/status/:id',isAuthenticated,isAuthorized,updateStatus)  

export default router;