import express from "express"
const router=express.Router()
import {fetchRequest,fetchRequests,createRequest,dropRequest,modifyRequest, fetchSolutions} from '../controllers/codeBuddyControllers.js'


//All db table creation logic has been removed since they're one time 

//request API endpoints
router.get("/request",fetchRequests)
router.get("/request/:id",fetchRequest)  //route parameters change dynamically
router.post("/request",createRequest) 
router.put("/request/:id",modifyRequest)
router.delete("/request/:id",dropRequest)
//solutions API endpoints
router.get("/solutions/:id",fetchSolutions)

export default router

