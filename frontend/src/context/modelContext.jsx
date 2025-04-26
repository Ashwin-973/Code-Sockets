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
  const [footerButtons, setFooterButtons] = useState([]);
  const [footerUtils, setFooterUtils] = useState([]);
    //is it good practice to import context inside of context
   const openModal = (type = 'editor') => {
    setModalType(type);
    setOpen(true);
  }
  const closeModal = () => {
    setOpen(false);
  }


  // Helper function to set buttons with proper structure , actually this breaks the single responsibility of model context in one way or the other
  const updateFooterButtons = (buttons) => {
    setFooterButtons(buttons.map(button => ({
      label: button.label,
      onClick: button.onClick,
      variant: button.variant || "default",
      disabled: button.disabled || false
    })));
  };
{/*can I do better, state for just one button? */}
  const updateFooterUtils=(buttons)=>  
  {
    setFooterUtils(buttons.map(button => ({
      label: button.label,
      onClick: button.onClick,
      variant: button.variant || "default",
      disabled: button.disabled || false
    })));
  }

{/* is it bad practice to pass state update function as prop ?, that's why we use object shorthand notation?*/}
  return (
    <ModalContext.Provider value={{
      open, setOpen,
      openModal,closeModal,
      modalType, setModalType,
      footerButtons,
      setFooterButtons: updateFooterButtons   ,
      footerUtils,
      setFooterUtils : updateFooterUtils
    }}>
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
