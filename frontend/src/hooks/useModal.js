// hooks/useModal.js
import { useState } from 'react';

export const useModal = () => {     //wtf does use modal do here?
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () =>
  {
    console.log("A req got opened : ",isOpen)
    return setIsOpen(true);
  } 
    
  const closeModal = () => {
    console.log("A req got closed : ",isOpen)
    return setIsOpen(false); 
   }     
  
  return { isOpen, openModal, closeModal }; //provides fucntions that update modal state
};