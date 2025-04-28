const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://codesockets-core.onrender.com' 
  : 'http://localhost:3000';

import { sendNotification } from "./notificationService";

const getSolutions = async (requestId) => {
  try {
    const response = await fetch(`${API_URL}/codebuddy/solution/${requestId}`);
    if (!response.ok) {
      throw new Error('Error fetching solutions');
    }
    const parsed = await response.json();
    return parsed.data;
  } catch (err) {
    throw new Error(err);
  }
};

const submitSolution = async (requestData,solutionData) => {   //how do I get the id?
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(solutionData)
  };
  console.log(requestData)
  console.log(solutionData)
  try {
    const response = await fetch(`${API_URL}/codebuddy/solution`, options);
    if (!response.ok) {
      throw new Error("Error submitting solution");
    }
    const parsed = await response.json();
    //help soln notification
    
    try{
      await sendNotification({
          // recipientId: originalPosterId,
          recipientId: requestData.user_id,
          type: "solution_submitted",
          // meta: { requestId, helperName: currentUser.name }  //why the use of current use in both places , a similar usage in accept soln is logical?
          meta: { requestId:requestData.id, helperName: solutionData.helper_id }
        });
        console.log("Notification sent to OP")
    }
    catch(err){
      console.log(err || err.stack)
      console.log("Notification not sent to OP")

    }
      return parsed;

  } catch (err) {
    throw new Error(err);
  }
};

const confirmSolution= async(requestData,solutionData,versionNumber)=>
{
  console.log()
  const options={
    method:'PUT',
}
console.log(requestData)
console.log(solutionData)
try{
    const response=await fetch(`${API_URL}/codebuddy/solution/${requestData.id}?helper_id=${solutionData.helper_id}&version=${versionNumber}`,options)
    if(!response.ok){
        throw new Error('Error confirming Solution')
    }
    console.log("Pulled")
    const parsed=await response.json()
    //accept soln notification
   try{
    console.log("entered")
     await sendNotification({
         // recipientId: helperId,
         recipientId:solutionData.helper_id,
         type: "solution_accepted",
         // meta: { requestId, opName: currentUser.name }  //why reqid?
         meta: { requestId:requestData.id, opName:requestData.user_id }
       });
    console.log("Notification sent to helper")
   }
   catch(err){
    console.log(err || err.stack)
    console.log('notifications not sent to helper')
   }
   console.log("retruning")
    return parsed.message
}
catch(err)
{
    throw new Error(err)
}
}

export { getSolutions, submitSolution,confirmSolution };
