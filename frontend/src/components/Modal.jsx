// components/Modal.jsx
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is on a select dropdown element 
      //clicking the select label still closes the modal
      const isSelectElement = event.target.closest('[data-radix-select-content]') || 
      event.target.closest('[role="listbox"]') ||
      event.target.hasAttribute('data-slot');

      if (modalRef.current && !modalRef.current.contains(event.target) && !isSelectElement) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden'; //wtf does it mean?
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]); //keeps running as long as there's change in the open state of the product card

  if (!isOpen) return null; //don't return any JSX
//why does the navbar appear over the editor , it's ugly
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div ref={modalRef} className="bg-white relative z-100 rounded-lg p-6 w-full max-w-xl">
        {children}
      </div>
    </div>
  );
};

export default Modal;