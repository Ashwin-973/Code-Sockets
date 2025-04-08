// hooks/useModal.js
import { useState } from 'react';

export const useModal = () => {     //wtf does use modal do here?
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);       
  
  return { isOpen, openModal, closeModal }; //provides fucntions that update modal state
};