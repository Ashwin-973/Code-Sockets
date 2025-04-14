// modalContext.jsx
import { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const modalContent=null   //fallback , that could be used if you want some other content to pop-up as a model
  const [isOpen, setIsOpen] = useState(false);
  // const [modalContent, setModalContent] = useState(null);
  
  const openModal = () => {
    // setModalContent(content);
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    // Optional: Clear content after animation completes
    // setTimeout(() => setModalContent(null), 300);
  };
  
  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
