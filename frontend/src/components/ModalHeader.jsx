//have two header's rendered conditionally , CodeEditor bar or CaroualCard bar
import { useEffect ,useState} from "react"
import { useModal } from "../context/modelContext"
import { AnimatedTooltipPreview } from "./AnimatedProfile"
import { UserRoundCheck } from "lucide-react"
import { CircleCheckBig } from "lucide-react"
import { IconUrgent } from "@tabler/icons-react"
import { Button } from "./ui/button"
import { useRequestContext } from "../context/requestContext"
import { useUserContext } from "../context/userContext"

function ModalHeader(){
    const [wantedUser,setWantedUser]=useState(null)
    const [userProfile,setUserProfile]=useState(null) //is this the only way, state for profile details??
    const {open,modalType}=useModal()
    const {selectedRequest} =useRequestContext() //we got the requestData from selectedRequest
    const {getUserInfo} = useUserContext()
    //maybe get the current user state when doing auth, and pass it through context
    /*useEffect(() => {                 //use loading and error state for enhancement

        if (selectedRequest && selectedRequest.user_id) {  //useEffect runs twice so it changes state twice causing 3 renders
            
            // Fetch the user data
            const fetchOwner = async () => {
                try {
                    const userData = await getUserInfo(selectedRequest.user_id)
                    console.log("In effect",userData)
                    setWantedUser(userData)
                } catch (err) {
                    console.log("User data fetch failed!")
                } 
            }
            
            fetchOwner()
        }
    }, [selectedRequest, getUserInfo])
    if(!open) return   //if user is yourself ,just display "you"  & add logic for whether he wants to use real name or anonymous name
    if (wantedUser && Array.isArray(wantedUser) && wantedUser.length > 0){
        const profileData=[{
            id:10,
            name:wantedUser[0].name,
            designation:"anybody",
            image:wantedUser[0].profile
        }]
        setUserProfile(profileData)
        console.log("profile data",profileData)
    }
    else{
        console.log("undefined")
    }*/
    
    return(
        <div>
           {modalType==='carousel'?(
            <div className="flex items-center justify-around gap-84">
            <div className="flex items-center gap-8">
                <div>
                   <AnimatedTooltipPreview/>
                </div>
                <div>
                    <Button>{selectedRequest.language}</Button>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button>
                    <UserRoundCheck color={selectedRequest.status==="solved"?"#50ee07":"#D3D3D3"}/>
                </button>
                <button>
                    <CircleCheckBig color={!selectedRequest.is_open?"#50ee07":"#D3D3D3"}/>
                </button>
                <button>
                    <IconUrgent color={selectedRequest.urgent_toggle?"#eb0d0d":"#D3D3D3"}/>
                </button>
            </div>
        </div>
           ):<></>}
        </div>
    )
}

export {ModalHeader}