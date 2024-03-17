import express from 'express'
import {mySubmissions,getProfileStats} from '../controllers/reviewController.js'
import { isAuthenticated, isTeamMember } from '../middlewares/auth.js';

const router=express.Router()

router
  .get('/',isAuthenticated,isTeamMember,mySubmissions)
  .get('/profile',isAuthenticated,getProfileStats)

export default router;