"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  // ModalTrigger,
} from "../ui/animated-modal";
 //should I really keep this in Modal context?
import { motion } from "motion/react";
import { useModal } from "../../context/modelContext";
import { ModalHeader } from "./ModalHeader";
import { useRequestContext } from "../../context/requestContext";

function AnimatedModalDemo({children,onClose}) {
  const {setOpen,footerButtons,footerUtils}=useModal()
  const {isEditMode}=useRequestContext()
   // Handle close action with a fallback , flexibl design
   const handleClose = () => {
    if (onClose) onClose();
    else setOpen(false);
  };
  return (
    <div className="py-40 flex items-center justify-center">
      <Modal>
        {/*<ModalTrigger
          className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span
            className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Book your flight
          </span>
          <div
            className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            ✈️
          </div>
        </ModalTrigger>*/}
        <ModalBody>
          <ModalContent className="items-center !justify-between">
              {!isEditMode?<ModalHeader/>:""}
              {children}
          </ModalContent>
          <ModalFooter className="gap-4 -mt-4">
            {/*<button onClick={handleClose}
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>*/}
            {/*even if you give type="submit" the button still won't know to which form is it connected to.. */}
            {footerButtons.length > 0 ? (
              footerButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  disabled={button.disabled}         
                  className={`px-2 py-1 rounded-md text-sm w-28 ${
                    button.variant === "primary" 
                      ? "bg-black text-white dark:bg-white dark:text-black border border-black" 
                      : "bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300"
                  }`}>
                  {button.label}
                </button>
              ))

            ) : (
              <button onClick={handleClose}
                className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                Cancel
              </button>
            )} 
            {footerUtils.length >0 && isEditMode ?(
              footerUtils.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  disabled={button.disabled}
                  className={`px-2 py-1 rounded-md text-sm w-28 ${
                    button.variant === "primary" 
                      ? "bg-black text-white dark:bg-white dark:text-black border border-black" 
                      : "bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300"
                  }`}>
                  {button.label}
                </button>
              ))

            ):("")}
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}


export {AnimatedModalDemo}