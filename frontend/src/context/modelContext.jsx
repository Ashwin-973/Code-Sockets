// modalContext.jsx
import { createContext, useState, useContext } from 'react';

/*const ModalContext = createContext();

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

export const useModal = () => useContext(ModalContext);*/

const ModalContext = createContext(undefined);

export const ModalProvider = ({
  children
}) => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('editor'); // 'editor' or 'carousel'
  const openModal=(type = 'editor')=>       //wtd the use of type="editor"
  {
    setModalType(type);
    setOpen(true)
  }
  const closeModal=()=>
  {
    setOpen(false)
  }

  return (
    <ModalContext.Provider value={{ open, setOpen ,openModal,closeModal,modalType,setModalType }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
