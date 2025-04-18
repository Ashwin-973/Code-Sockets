import { useModal } from '../context/modelContext';
import { useRequestContext } from '../context/requestContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedModalDemo } from './EnhancedModal';
import CodeEditor from './CodeEditor';
import { CarouselCode } from './CarouselCode';
import { ModalHeader } from './ModalHeader';

export const ModalContainer = () => {
  const { open, closeModal, modalType } = useModal();
  const { isEditMode } = useRequestContext();
  if (!open) return null;
  
  return (
    <AnimatedModalDemo onClose={closeModal}>
      {modalType === 'editor' ? (
        <CodeEditor onComplete={closeModal} />
      ) : (
        <CarouselCode />
      )}
    </AnimatedModalDemo>
  );
};