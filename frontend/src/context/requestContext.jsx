import { useModal } from '../context/modelContext'
import { createContext, useState, useContext,useEffect } from 'react';
import {getRequests,getRequest,postRequest,deleteRequest,updateRequest} from '../services/codeRequestService'
import { getSolutions ,submitSolution as apiSubmitSolution,confirmSolution} from '../services/codeSolutionService'; //maybe move this to SolutionContext
import { useUserContext } from './userContext';

const RequestContext = createContext(undefined);

export const RequestProvider = ({ children }) => { 
   const {open,openModal,closeModal}=useModal()  //does this provider function have some special ability?
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null); //holding all the availabe requests
  const [solutions, setSolutions] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSolutionMode, setIsSolutionMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

   // Add a function to select a request
   const selectRequest = (request,modalType = 'editor') => {   //again why the hardcoded type?
    setSelectedRequest(request);
    openModal(modalType);
  };
  //avoids request state duplication while adding new requests
  useEffect(()=>
  {
    if(!open){
      setSelectedRequest(null);
    }
  },[open])




const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
}

const toggleSolutionMode = (value) => {
  /*if (value !== null) {
    setIsSolutionMode(value);
  } else {
    setIsSolutionMode(!isSolutionMode);
  }*/
  setIsSolutionMode(value)
}


  const addRequest = async (requestData) => {   //all fetch calls must be inside useEffect , {connecting to an external system} . what if it ain't?
    setIsLoading(true);
    setError(null);
    
    try {
        await postRequest(requestData)
      // API call would go here
      // const response = await productService.createProduct(productData);       //wtf is this?
    //if there's an error like 500 setRequests must not happen , as DB doesn't have this data , maybe automate the fetch req again. or maybe show a toast??
      setRequests(prevRequests => [...prevRequests, requestData]);   //updating the total avail products
      // displayRequests() without this delet won't work without an explicit request
      return requestData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

const displayRequest=async(requestId)=>
{
  setIsLoading(true);
  setError(null);
  try{
    const requestData= await getRequest(requestId)   //maybe add this to selected request
    return requestData
  }
  catch(err){
    setError(err.message)
    throw err
  }
  finally{
    setIsLoading(false)
  }


}

const displayRequests = async () => { 
    setIsLoading(true);
    setError(null);
    //have a utility function that sends only the content:value pair of the requestData / use .map to do so..using !==
    try {
        const existingRequests=await getRequests()
        setRequests(existingRequests);   //updating the total avail products
      return existingRequests;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
const removeRequest=async(requestId)=>
  {
    setIsLoading(true);
    setError(null);
    try{
      const deleteStatus=await deleteRequest(requestId)
      console.log(deleteStatus)
      displayRequests()
      return
    }
    catch(err)
    {
      setError(err.message)
      throw err
    }
    finally{
      setIsLoading(false)
    }
  }

const refurbishRequest=async(requestId,modifiedData)=>
{
  setIsLoading(true);
  setError(null);
  try{
    await updateRequest(requestId,modifiedData)
    displayRequests()  //is this necessary
    console.log("update status")
    return 
  }
  catch(err)
  {
    setError(err.message);
  }
  finally {
    setIsLoading(false);
  }
  

}

const fetchSolutions = async (requestId) => {
    setIsLoading(true);
    setError(null);
    try {
      const solutionsData = await getSolutions(requestId);
      setSolutions(solutionsData || []);
      return solutionsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const selectRequestWithSolutions = async (request, modalType = 'carousel') => {
    setSelectedRequest(request);
    setIsEditMode(false);
    setCurrentSlideIndex(0); // Reset to middle (will be adjusted after solutions load)
    
    if (modalType === 'carousel') {
      try {
        await fetchSolutions(request.id);
        // Set middle index after solutions load
        setCurrentSlideIndex(Math.floor(solutions.length / 2));
      } catch (error) {
        console.error("Failed to fetch solutions:", error);
      }
    }
    
    openModal(modalType);
  };

const submitSolution = async (selectedRequest,solutionData) => {
  setIsLoading(true);
  setError(null);
  
  try {
    await apiSubmitSolution(selectedRequest,solutionData);
    // Refresh solutions after submission
    await fetchSolutions(solutionData.request_id);
    return true;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setIsLoading(false);
  }
};

const pullSolution=async(requestData,solutionData)=>
{
  setIsLoading(true);
  setError(null);
  try{
    await updateRequest(requestData.id,{...requestData,is_open:false,status:'solved'})
    await confirmSolution(requestData,solutionData,solutionData.version)
  }
  catch(err){
    setError(err.message);
  }
  finally{
    setIsLoading(false)
  }
  // update code_req
  // update code_sol
  displayRequests()
}


  return (
    <RequestContext.Provider value={{ 
      requests, 
      isLoading, 
      error, 
      addRequest, 
      displayRequests, 
      displayRequest, 
      selectedRequest, 
      removeRequest, 
      refurbishRequest,
      selectRequest,
      selectRequestWithSolutions,
      solutions,
      currentSlideIndex,
      setCurrentSlideIndex,
      isEditMode,
      toggleEditMode,
      isSolutionMode,
      toggleSolutionMode,
      fetchSolutions,
      submitSolution,
      pullSolution
    }}>  {/*can't understand*/}
      {children}  {/*removed selectedrequest */}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => useContext(RequestContext);  //can't understand