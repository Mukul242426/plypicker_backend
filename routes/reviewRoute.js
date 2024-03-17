import express from 'express'
import {mySubmissions,getProfileStats,getPendingRequest} from '../controllers/reviewController.js'
import { isAdmin, isAuthenticated, isTeamMember } from '../middlewares/auth.js';

const router=express.Router()

router
  .get('/',isAuthenticated,isTeamMember,mySubmissions)
  .get('/profile',isAuthenticated,getProfileStats)
  .get('/pending/request',isAuthenticated,isAdmin,getPendingRequest)

export default router;