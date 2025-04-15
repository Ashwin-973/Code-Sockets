import { useModal } from '../context/modelContext';
import { useRequestContext } from '../context/requestContext';
import { AnimatedModalDemo } from './EnhancedModal';
import CodeEditor from './CodeEditor';
import { CarouselCode } from './CarouselCode';

export const ModalContainer = () => {
  const { open, closeModal, modalType } = useModal();
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