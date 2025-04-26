import { useState } from 'react';
import {Stepper,Step} from '../ui/stepper';
import { Avatar,AvatarImage,AvatarFallback } from "../ui/avatar"; 

import {StepperInput} from "../common/StepperInput"
export function OnBoard(){
  const[name,setName]=useState("")
  const[profile,setProfile]=useState("https://i.pinimg.com/736x/b3/a7/33/b3a733480dcc957f5359941e60f4ad7c.jpg" )
  return(
    <Stepper
    initialStep={1}
    onStepChange={(step) => {
      console.log(step);
    }}
    onFinalStepCompleted={() => console.log("All steps completed!")}
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
      <h1>Step 2</h1>
      <Avatar className="m-auto size-24"> 
          <AvatarImage src={profile} alt="Mr.White" />
          <AvatarFallback>WW</AvatarFallback>
      </Avatar>
      <StepperInput header="Upload your Profile!"/>
    </Step>
    <Step>
    <StepperInput header="What's your name?"/>
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