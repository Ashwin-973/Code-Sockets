import Modal from './Modal';
import {useModal} from '../hooks/useModal'
import CodeEditor from './CodeEditor';
import {Trash2} from 'lucide-react'
import {Pencil} from 'lucide-react'
import { useRequestContext } from '../context/requestContext';
// The dynamic grid that fills upon posting
function DynamicGrid({ items }) {
  const {isOpen,openModal,closeModal}=useModal()
  const { selectRequest } = useRequestContext();
  const handleRequestClick = (item) => {
    selectRequest(item);
    openModal();
  };
  return (
    <div className="container mx-auto">
      {items.length === 0?(
        <p>No Requests for now , try adding one!!</p>
      ):(
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-8">
            {items.map((item) => (
              <div key={item.id}  className="w-full flex flex-col justify-center items-center">
                <div onClick={() => handleRequestClick(item)} className="cursor-pointer bg-gray-800 w-2/3 h-90 rounded-3xl overflow-hidden">
                  <span className="p-4 text-[12px] text-white text-center block">{item.content}</span>
                </div>
                <div className="my-2 w-full flex justify-around items-center">        {/*item.id is temporary so find a better key... */}
                  <Pencil className="cursor-pointer"/>
                  <Trash2 className="cursor-pointer" color="#eb0d0d"/>
                </div>
              </div>
            ))}
              <Modal isOpen={isOpen} onClose={closeModal} >
                <CodeEditor onComplete={closeModal}/>
              </Modal>
          </div>
    )}
    </div>
  );
}

export {DynamicGrid} 
