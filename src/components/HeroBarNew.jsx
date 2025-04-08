// components/HeroBar.jsx
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import ProductForm from './ProductForm';

const HeroBar = () => {
  const { isOpen, openModal, closeModal } = useModal(); // use modal returns a state var and two state setters , but why two - because close and open are handled in diff components 
  
  return (
    <div className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">My Store</h1>
        
        <button 
          onClick={openModal}
          className="bg-white text-blue-600 px-4 py-2 rounded"
        >
          Add Product
        </button>
        
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ProductForm onComplete={closeModal} />
        </Modal>
      </div>
    </div>
  );
};

export default HeroBar;