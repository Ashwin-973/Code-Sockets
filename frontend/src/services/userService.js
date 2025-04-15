const API_URL=import.meta.env.MODE==='production'? 'https://codesockets-core.onrender.com'
: 'http://localhost:3000';


const fetchUser=async(userId)=>
{
    try{
        const response=await fetch(`${API_URL}/user?userId=${userId}`)
        if(!response.ok){
            throw new Error('Error fetching the request')
        }
        const parsed=await response.json()
        return parsed.data

    }
    catch(err){
        throw new Error(err)
    }

}

export {fetchUser}