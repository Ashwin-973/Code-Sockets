import { useState } from 'react';
import {useAuth0} from '@auth0/auth0-react'
import {useNavigate} from 'react-router-dom'
import { useUpdateUserMetadata } from '../../services/userService';
import { createUser } from '../../services/userService';
import {Stepper,Step} from '../ui/stepper';
import { Avatar,AvatarImage,AvatarFallback } from "../ui/avatar"; 
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

import {StepperInput} from "../common/StepperInput"
export function OnBoard(){
  const[profile,setProfile]=useState("https://d2thvodm3xyo6j.cloudfront.net/media/2023/05/d11e888305982463-600x338.jpg" )
  const[name,setName]=useState("")
  const {isLoading,user} =useAuth0()
  const { updateMetadata } = useUpdateUserMetadata();
  const navigate = useNavigate();
  console.log("User at Onboard",user)
  const userData={
    id:user.sub,
    name:name,
    anonymous_name:null,
    profile:profile,
    skill_level:null,
    interests:null,
    mood:null,
    status:'active',
    onboarded: true
  }
const handleOnboarding=async()=>
  {
    try{
      await createUser(userData)
      navigate('/collaborate');
    }
    catch(err)
    {
      console.log("error onboarding user",err)
    }
  }
console.log(profile)
console.log(name)

  const handleCompleteOnboarding = async () => {
    await updateMetadata({ onboarded: true });  //do not tamper if onboarded is already true
    // After updating metadata, redirect to collaborate
    navigate('/collaborate');
  }
  
  const handleProfile = (e) => {
    setProfile(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    setProfile("https://d2thvodm3xyo6j.cloudfront.net/media/2023/05/d11e888305982463-600x338.jpg" )
    setName("")
    e.preventDefault();
  };
  return(
    <Stepper
    initialStep={1}
    onStepChange={(step) => {
      console.log(step);
    }}
    onFinalStepCompleted={(name || profile)?async() => await handleOnboarding():console.log("Name or profile cannot be empty")}
    backButtonText="Previous"
    nextButtonText="Next"
  >
    {/*add interests' select  */}
    <Step>
      <h3
        className="mb-10 sm:mb-20 text-xl text-center sm:text-2xl dark:text-white text-black">
        Welcome to Code Sockets
      </h3>
      <h3
        className="mb-10 sm:mb-20 text-xl text-center sm:text-2xl dark:text-white text-black">
        Check out the next step
      </h3>
    </Step>
    <Step>
      <Avatar className="m-auto size-48"> 
          <AvatarImage src={profile} alt="Mr.White" />
          <AvatarFallback>WW</AvatarFallback>
      </Avatar>
      <div className="h-[16rem] flex flex-col justify-center  items-center px-4">
        <h5 className="mb-10 sm:mb-20 text-xl text-center sm:text-2xl dark:text-white text-black">
        Upload your Profile
        </h5>
        <PlaceholdersAndVanishInput  placeholders={["Please Enter a valid URL"]}  onChange={handleProfile} onSubmit={onSubmit} />
      </div>
    </Step>
    <Step>
    <div className="h-[16rem] flex flex-col justify-center  items-center px-4">
        <h5 className="mb-10 sm:mb-20 text-xl text-center sm:text-2xl dark:text-white text-black">
        What's your name?
        </h5>
        <PlaceholdersAndVanishInput  onChange={handleName} onSubmit={onSubmit} />
      </div>
    </Step>
    <Step>
    <h3
      className="mb-10 sm:mb-20 text-xl text-center sm:text-2xl dark:text-white text-black">
        You made it!
      </h3>
    </Step>
  </Stepper>
  )
  
}