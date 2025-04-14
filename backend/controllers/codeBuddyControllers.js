import { sql } from "../config/db.js"

const fetchRequests=async(_,res)=>
{
    try{
        const allRequests=await sql`SELECT * FROM code_requests;`
        return res.status(200).json({
            message:'All Requests fetched',
            data:allRequests
        })

    }catch(err){
        console.log(err.stack || err)
        return res.status(500).json({
            message:'Internal Server Error',
            data:null
        })

    }
}
const fetchRequest=async(req,res)=>
    {
        const {id}=req.params
        try{
            const request=await sql`SELECT * FROM code_requests WHERE id=${id};`
            return res.status(200).json({
                message:'Request Fetched',
                data:request
            })
        }
        catch(err)
        {
            console.log(err.stack || err)
            return res.status(500).json({
                message:'Internal Server Error',
                data:null
            })
        }
    
    }
const createRequest=async(req,res)=>
{
    //validate all fields
    try{
        const {user_id, skill_level_required, content, language, urgent_toggle, problem_description, is_open, status}=req.body
        await sql`INSERT INTO code_requests (user_id, skill_level_required, content, language, urgent_toggle, problem_description, is_open, status)
        VALUES(${user_id},${skill_level_required} , ${content}, ${language}, ${urgent_toggle},${problem_description},${is_open},${status});`
      // res.send(newRequest) both res.send and res.json are sent to the client?
        return res.status(201).json({
            message:'Request Created',
            data:null
        })

    }
    catch(err){
        console.log(err.stack || err)
        return res.status(500).json({
            message:'Internal Server Error',
            data:null
        })
    }
    
}
//should I send deleted and updated products?
const dropRequest=async(req,res)=>
{
    const {id}=req.params
    console.log(id)
    try{
        await sql`DELETE FROM code_requests WHERE id=${id};`
        return res.status(200).json({
            message:'Request Deleted',
            data:null
        })
    }
    catch(err){
        console.log(err.stack || err)
        return res.status(500).json({
            message:'Internal Server Error',
            data:null
        })
    }

    

}
const modifyRequest=async(req,res)=>
{
    const {id}=req.params
    try{
        const {user_id, skill_level_required, content, language, urgent_toggle, problem_description, is_open, status}=req.body
        const modifiedRequest=await sql`UPDATE code_requests
                SET
                user_id = ${user_id},
                skill_level_required = ${skill_level_required},
                content = ${content},
                language = ${language},
                urgent_toggle = ${urgent_toggle},
                problem_description = ${problem_description},
                is_open = ${is_open},
                status = ${status}
                WHERE id = ${id}
                RETURNING *;`
        return res.status(200).json({
            message:'Request Modified',
            data:modifiedRequest
        })
    }
    catch(err){
        console.log(err.stack || err)
            return res.status(500).json({
                message:'Internal Server Error',
                data:null
            })
    }

}


export {fetchRequest,fetchRequests,createRequest,dropRequest,modifyRequest}
