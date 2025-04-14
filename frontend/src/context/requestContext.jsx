import { useModal } from '../context/modelContext'
import { createContext, useState, useContext,useEffect } from 'react';
import {getRequests,getRequest,postRequest,deleteRequest,updateRequest} from '../services/codeBuddyService'

const RequestContext = createContext();

export const RequestProvider = ({ children }) => { 
   const {isOpen}=useModal()  //does this provider function have some special ability?
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null); //holding all the availabe products
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

   // Add a function to select a request
   const selectRequest = (request) => {
    setSelectedRequest(request);
  };
  //avoids request state duplication while adding new requests
  useEffect(()=>
  {
    console.log("Entered useEffect")
    if(!isOpen){
      console.log("A req got closed via useEffect")
      setSelectedRequest(null);
    }
  },[isOpen])

  const addRequest = async (requestData) => {   //when does this run?
    setIsLoading(true);
    setError(null);
    
    try {
        await postRequest(requestData)
      // API call would go here
      // const response = await productService.createProduct(productData);       //wtf is this?
    //if there's an error like 500 setRequests must not happen , as DB doesn't have this data , maybe automate the fetch req again. or maybe show a toast??
      setRequests(prevRequests => [...prevRequests, requestData]);   //updating the total avail products
      return requestData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const displayRequests = async () => { 
    console.log("Entered display requests")  
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
      displayRequests
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

  return (
    <RequestContext.Provider value={{ requests, isLoading, error, addRequest,displayRequests,selectedRequest,removeRequest,selectRequest }}>  {/*can't understand*/}
      {children}  {/*removed selectedrequest */}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => useContext(RequestContext);  //can't understand