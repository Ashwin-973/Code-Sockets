import express from "express"
const router=express.Router()
import {fetchRequest,fetchRequests,createRequest,dropRequest,modifyRequest} from '../controllers/codeBuddyControllers.js'


//All db table creation logic has been removed since they're one time 


router.get("/request",fetchRequests)
router.get("/request/:id",fetchRequest)
router.post("/request",createRequest)
router.put("/request/:id",modifyRequest)
router.delete("/request/:id",dropRequest)


export default router

