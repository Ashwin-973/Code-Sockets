import { useRef } from "react";
import { useRequestContext } from "../context/requestContext";
import { useModal } from "../context/modelContext";
// import { useModal } from "../hooks/useModal"
import Modal from "./Modal";
import CodeEditor from "./CodeEditor";
import { CustomButton } from "./CustomButton";
import { ShimmerButton } from "./ui/shimmer-button";
import { SearchBar } from "./ui/searchbar";
import { Toggle } from './ui/toggle';
import { List } from 'lucide-react'
import { LayoutGrid } from 'lucide-react'
import {RefreshCcw} from 'lucide-react'


// Contains the search bar , the buttons and grid-list toggle
function HeroBar(){
    // const {isOpen,openModal,closeModal}=useModal()  //how do I change this one?
    const {openModal,closeModal}=useModal()
    const {displayRequests} = useRequestContext()
    async function Refresh(){
        try{
            await displayRequests()
        }
        catch(err){
            console.log('Refresh functionality failed:',err)
        }
    }
    return(
        <div className="flex justify-around gap-12">
            <div className="w-1/2">
                <div className=" w-full my-32 bg-white flex items-center justify-center p-4">
                    <SearchBar/>
                <div/>
            </div>
            </div>
            <div className="flex justify-between items-center gap-8">
                {/* <CustomButton onClick={openModal} label="Ask For Help" icon={BadgeHelp} /> */}
                {/* <CustomButton  label="Browse Help Requests" icon={HeartHandshake} /> */}
                <div onClick={()=>openModal('editor')}>
                    <ShimmerButton  label={"Ask For Help"}/> {/*Add icon ,not accepting onClick function*/} 
                </div>
                <ShimmerButton label={"Browse Help Requests"}/>
            </div>
            <div className="flex justify-between items-center gap-4">
                <Toggle>
                    <List/>
                </Toggle>
                <Toggle>
                    <LayoutGrid/>
                </Toggle>
                <RefreshCcw onClick={Refresh} className="hover:bg-gray-300"/>
            </div>
            {/* <Modal isOpen={IsOpen} onClose={closeModal} >
                <CodeEditor onComplete={closeModal}/>
            </Modal>  */}
        </div>

    )
}


export {HeroBar}