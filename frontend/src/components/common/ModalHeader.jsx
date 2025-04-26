//have two header's rendered conditionally , CodeEditor bar or CaroualCard bar
import { useEffect ,useState,useMemo} from "react"
import { useModal } from "../../context/modelContext"
import { useRequestContext } from "../../context/requestContext"
import { useUserContext } from "../../context/userContext"
import { AnimatedTooltipPreview } from "./AnimatedProfile"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { UserRoundCheck } from "lucide-react"
import { CircleCheckBig } from "lucide-react"
import { IconUrgent } from "@tabler/icons-react"
import { Button } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";


function ModalHeader(){
    const [currentUser, setCurrentUser] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);                        //is this the only way, state for profile details??
    const {open,modalType}=useModal()
    const { selectedRequest, solutions, currentSlideIndex, isEditMode } = useRequestContext();
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
 // Use useMemo to calculate allSlides and currentSlide to prevent recalculation on every render  - understand why the prev code caused unnecessary re-renders and not this one
 const allSlides = useMemo(() => {
  if (!selectedRequest) return [];
  return [
      ...solutions.slice(0, Math.floor(solutions.length / 2)),
      { ...selectedRequest, isOriginal: true },
      ...solutions.slice(Math.floor(solutions.length / 2))
  ];
}, [selectedRequest, solutions]);

const currentSlide = useMemo(() => {
  return allSlides[currentSlideIndex];
}, [allSlides, currentSlideIndex]);

// Add a userId dependency to prevent unnecessary API calls
    const userId = useMemo(() => {
        if (!currentSlide) return null;
        return currentSlide.isOriginal ? currentSlide.user_id : currentSlide.helper_id;
    }, [currentSlide]);


    useEffect(() => {
      if (!open || !userId) return;
      
      const fetchUserData = async () => {
          try {
              const userData = await getUserInfo(userId);
              setCurrentUser(userData[0]);
          } catch (error) {
              console.error("Failed to fetch user data:", error);
          }
      };
      
      fetchUserData();
  }, [open, userId, getUserInfo]); // Only depend on userId, not the entire currentSlide object
  
  if (!open || !currentSlide) return null;
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

    return(
        <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-t-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage 
                    src={currentUser?.profile || "https://i.pinimg.com/736x/b3/a7/33/b3a733480dcc957f5359941e60f4ad7c.jpg"} 
                    alt={currentUser?.name || "User"} 
                  />
                  <AvatarFallback>
                    {currentUser?.name?.substring(0, 2).toUpperCase() || "UN"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {currentUser?.name || currentUser?.anonymous_name || "Anonymous User"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {currentUser?.skill_level || "Unknown skill level"}   {/*ig skill level is not needed*/}
                  </p>
                </div>
              </div>
              
              {currentSlide.isOriginal && !isEditMode && (
                <div className="flex items-center gap-4">
                  <Button variant="outline">{currentSlide.language}</Button>
                  <div className="flex items-center gap-2">
                    <UserRoundCheck 
                      color={currentSlide.status === "solved" ? "#50ee07" : "#D3D3D3"} 
                    />
                    <CircleCheckBig 
                      color={!currentSlide.is_open ? "#50ee07" : "#D3D3D3"} 
                    />
                    <IconUrgent 
                      color={currentSlide.urgent_toggle ? "#eb0d0d" : "#D3D3D3"} 
                    />
                  </div>
                </div>
              )}
              
              <button 
                onClick={toggleCollapse}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full p-1 shadow-md"
            >
                <ChevronUp size={16} />
            </button>
            </div>
        </motion.div>
      )}
      {isCollapsed && (
        <div className="flex justify-center">
          <button 
            onClick={toggleCollapse}
            className="bg-white rounded-full p-1 shadow-md my-2"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </AnimatePresence>
    )
}

export {ModalHeader}