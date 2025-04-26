import { sql } from "../configs/neon.js"

const createUser=async(req,res)=>
{
   

}

const getUser=async(req,res)=>
{
    const userId=req.query.userId  //used to get query parameters
    try{
        const userDetails=await sql`SELECT * FROM users WHERE id=${userId};`
        res.status(200).json({
            message:"User Fetched",
            data:userDetails
        })

    }
    catch(err){
        console.log(err.stack || err)
        res.status(500).json({
            message:"Internal Server Error",
            data:null
        })
    }
    
}
export {createUser,getUser}