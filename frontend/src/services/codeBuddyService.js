//should I console log errors or throw errors in the client side??
const API_URL=import.meta.env.MODE==='production'? 'https://your-production-backend.com'
: 'http://localhost:3000';
console.log(API_URL)
//set toasts for all services here!!
const getRequests=async()=>
{
    try{
        const response=await fetch(`${API_URL}/codebuddy/request`)
        if(!response.ok){
            throw new Error('Error fetching requests')
        }
        const parsed= await response.json()
        return parsed.data
    }
    catch(err){
        throw new Error(err)
    }

}
const getRequest=async(id)=>
{
    //how would I get the id of the clicked post??
    try{
        const response=await fetch(`${API_URL}/codebuddy/request/:${id}`)
        if(!response.ok){
            throw new Error('Error fetching the request')
        }
        const parsed= await response.json()
        return parsed.data
    }
    catch(err){
        throw new Error(err)
    }
}
const postRequest=async(requestData)=>
{
    const options={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(requestData)
      }
      try{
          const response=await fetch(`${API_URL}/codebuddy/request`,options)   
          if(!response.ok){
            throw new Error("There was an error during request post")
            }
          const parsed=await response.json()
          console.log(parsed)
      }
      catch(err){
        throw new Error(err)
      }
}
const deleteRequest=async(id)=>
{
    const options={
        method:'DELETE'
    }
    //how would I get the id of the clicked post??
    try{
        const response=await fetch(`${API_URL}/codebuddy/request/:${id}`,options)
        if(!response.ok){
            throw new Error('Error deleting request')
        }
        const parsed=await response.json()
        return parsed.message

    }
    catch(err)
    {
        throw new Error(err)
    }
}

const updateRequest=async(id,modifiedData)=>
{
    const options={
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(modifiedData)
    }
    try{
        const response=await fetch(`${API_URL}/codebuddy/request/:${id}`,options)
        if(!response.ok){
            throw new Error('Error updating request')
        }
        const parsed=await response.json()
        return parsed.message
    }
    catch(err)
    {
        throw new Error(err)
    }
}

export {getRequests,getRequest,postRequest,deleteRequest,updateRequest}

