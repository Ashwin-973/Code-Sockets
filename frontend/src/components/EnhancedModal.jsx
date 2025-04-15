"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  // ModalTrigger,
} from "./ui/animated-modal";
 //should I really keep this in Modal context?
import { CarouselCode } from "./CarouselCode";
import { motion } from "motion/react";
import { useModal } from "../context/modelContext";
import { ModalHeader } from "./ModalHeader";

function AnimatedModalDemo({children,onClose}) {
  const {setOpen}=useModal()
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
          <ModalContent className="flex flex-col items-center">
              <ModalHeader/>
              {children}
          </ModalContent>
          <ModalFooter className="gap-4 -mt-4">
            <button onClick={handleClose}
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}


export {AnimatedModalDemo}