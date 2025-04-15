import { sql } from "../config/db.js"

const createUser=async(req,res)=>
{
    try{
        await sql`INSERT INTO users (id, name, anonymous_name, profile, skill_level, interests, mood)
VALUES (
    'auth0|thecoinflip', -- A chilling element associated with the antagonist
    'Anton Chigurh',
    'Wells', -- A nod to Llewelyn Moss's last name
    'Seeking individuals with a strong sense of order and adherence to agreements. Experience in conflict resolution (unconventional methods preferred).',
    'expert',
    '{"philosophy", "justice", "problem-solving"}',
    'implacable'
);`
        const user=await sql`SELECT * FROM users;`
        await res.send(user)
        return res.json({
            status:'success',message:'User Created'
        })

    }
    catch(err){
        res.json({
            status:'failed',message:'500 : Internal Server Error'
        })
    }

}

const getUser=async(req,res)=>
{
    const userId=req.query.userId  //used to get query parameters
    console.log(userId)
    try{
        const userDetails=await sql`SELECT * FROM users WHERE id=${userId};`
        console.log(userDetails)
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