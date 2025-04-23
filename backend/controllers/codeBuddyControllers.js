import { sql } from "../config/db.js"
//perform input validation , if it's empty . Improve API design
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
        const {user_id, skill_level_required, content, language, urgent_toggle, problem_description, is_open, status}=req.body //put request doesn't require a body
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

const fetchSolutions=async(req,res)=>
    {
        const {request_id}=req.params //id of the code_request
        try{
            const solutions=await sql`SELECT * FROM code_solutions WHERE request_id=${request_id};`  //do you really need the entire row or only the necassary data??
            return res.status(200).json({
                message:'Solutions Fetched',
                data:solutions
            })
        }
        catch(err)
        {
            console.log(err.stack || err)  //beware error messages get displayed in postman
            return res.status(500).json({
                message:'Internal Server Error',
                data:null
            })
        }
    
    }

const createSolution=async(req,res)=>{
    try{
        const { request_id, helper_id, solution, explanation, solution_accepted, version } = req.body;
        // Get the latest version for this request if version not provided
        let solutionVersion = version;
        if (!solutionVersion) {
            const latestVersion = await sql`
            SELECT MAX(version) as max_version 
            FROM code_solutions 
            WHERE request_id = ${request_id}`;
            solutionVersion = (latestVersion[0]?.max_version || 0) + 1;
            console.log("Solution Version : ",solutionVersion)
        }

        await sql`INSERT INTO code_solutions (request_id,helper_id,version,solution,explanation,solution_accepted) VALUES(${request_id}, ${helper_id}, ${solutionVersion}, ${solution}, ${explanation}, ${solution_accepted})`
        return res.status(200).json({
            message:'Solution Created',
            data:null
        })
    }
    catch(err)
    {
        console.log(err.stack || err)
        res.status(500).json({
            message:'Internal Server error',
            data:null
        })

    }
}
const acceptSolution=async(req,res)=>
{
    try{
        const {request_id}=req.params
        const {helper_id,version}=req.query
        console.log(request_id)
        console.log(helper_id)
        console.log(version)
        await sql`UPDATE code_solutions SET solution_accepted=TRUE WHERE request_id=${request_id} AND helper_id=${helper_id} AND version=${version};`
        res.status(204).json({
            message:'Solution Accepted',   //it prints no content anyway,remove the response object
            data:null
        })
    }
    catch(err){
        console.log(err.stack || err)
        res.status(500).json({
            message:'Internal Server Error',
            data:null
        })
    }
}
export {fetchRequest,fetchRequests,createRequest,dropRequest,modifyRequest,fetchSolutions,createSolution,acceptSolution}
