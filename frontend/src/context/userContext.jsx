import { createContext,useContext ,useState} from "react";
import {fetchUser} from "../services/userService"
const UserContext=createContext(undefined)

export const UserProvider=({children})=>
{
    // const [isLoading, setIsLoading] = useState(false);  will this conflict with other providers' state?
    // const [error, setError] = useState(null);
    const currentUser={id:'auth0|summerfinn',skill_level:'moderate'}  //this would be set after eftching data from database
    const getUserInfo=async(userId)=>
    {
        // setIsLoading(true);
        // setError(null);
        try{
            return await fetchUser(userId)  //auth0 user Id
        }
        catch(err)
        {
            // setError(err)
            console.log(err)  //why does it show unnecessary try-catch clause when I remove the console log??
            throw err
        }
        /*finally{
            setIsLoading(false)
        }*/
    }

    return(
    <UserContext.Provider value={{getUserInfo,currentUser}}>
        {children}
    </UserContext.Provider>
    )

}


export const useUserContext = () => useContext(UserContext); 