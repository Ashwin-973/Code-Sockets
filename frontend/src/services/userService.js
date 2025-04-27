const API_URL=import.meta.env.MODE==='production'? 'https://codesockets-core.onrender.com'
: 'http://localhost:3000';
const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN
import { useAuth0 } from "@auth0/auth0-react";

const createUser = async(userData) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };
        
        const response = await fetch(`${API_URL}/user`, options);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating user');
        }
        
        const parsed = await response.json();
        return parsed.data;
    }
    catch(err) {
        throw new Error(err.message || 'Error creating user');
    }
}






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

 const useUpdateUserMetadata = () => {
    const { getAccessTokenSilently, user } = useAuth0();
  
    const updateMetadata = async (newMetadata) => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${AUTH0_DOMAIN}/api/v2/`, // IMPORTANT!
          scope: 'update:users'
        });
        console.log("Access token :",accessToken)
        const userId = user.sub; // eg. auth0|12345678
        console.log(userId)
        const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/users/${userId}`, {
          method: 'PATCH',
          headers: {
            'authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_metadata: newMetadata
          })
        });
        if(!response.ok){
            throw new Error('Something went wrong')
        }
        const data = await response.json();
        console.log('User metadata updated:', data);
        return data;
      } catch (error) {
        console.error('Failed to update metadata:', error);
      }
    };
  
    return { updateMetadata };
  };








export {createUser,fetchUser,useUpdateUserMetadata}