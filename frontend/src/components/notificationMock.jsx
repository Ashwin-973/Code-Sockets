import { sendNotification } from "@/firebase/notificationUtils";

export const submitSolution=async(requestData,solutionData)=>
{
    console.log("Notification sent to OP")

    await sendNotification({
        // recipientId: originalPosterId,
        recipientId: requestData.user_id,
        type: "solution_submitted",
        // meta: { requestId, helperName: currentUser.name }  //why the use of current use in both places , a similar usage in accept soln is logical?
        meta: { reqId:requestData.id, helperName: solutionData.helper_id }
      });

}


export const acceptSolution = async (requestData,solutionData) => {
    console.log("Notification sent to helper")

    await sendNotification({
        // recipientId: helperId,
        recipientId:solutionData.helper_id,
        type: "solution_accepted",
        // meta: { requestId, opName: currentUser.name }  //why reqid?
        meta: { reqId:requestData.id, opName:requestData.user_id }
      });
}