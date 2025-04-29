import { sql } from "../configs/neon.js"

const storeUser = async(req, res) => {
    try {
      const { id, name, anonymous_name, profile, interests, mood, status,onboarded } = req.body;
      

      //if user already exists don't store user
      try {
        const existingUser = await sql`SELECT * FROM users WHERE id=${id}`;
        if (existingUser && existingUser.length > 0) {
          console.log('User already exists');
          return res.status(200).json({
            message: 'User already exists',
            data: existingUser
          });
        }
      } catch (err) {
        console.log('Error checking existing user:', err);
        // Continue to create user if the check fails
      }
    
      if (!id || !name) {
        return res.status(400).json({
          message: "User ID and name are required",
          data: null
        });
      }
      const newUser = await sql`
        INSERT INTO users (id, name, anonymous_name, profile, interests, mood, status,onboarded) 
        VALUES (${id}, ${name}, ${anonymous_name || null}, ${profile || null}, ${interests || null}, ${mood || null}, ${status || 'active'}
        ,${onboarded})
        RETURNING *;
      `;
      
      res.status(201).json({
        message: "User Created Successfully",
        data: newUser
      });
    } catch (err) {
      console.log(err.stack || err);
      
      if (err.code === '23505') {
        return res.status(409).json({
          message: "User with this ID or anonymous name already exists",
          data: null
        });
      }
      
      res.status(500).json({
        message: "Internal Server Error",
        data: null
      });
    }
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
export {storeUser,getUser}