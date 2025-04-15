import { useRef } from "react";
import { useRequestContext } from "../context/requestContext";
import { useModal } from "../hooks/useModal"
import Modal from "./Modal";
import CodeEditor from "./CodeEditor";
import { CustomButton } from "./CustomButton";
import { SearchBar } from "./ui/searchbar";
import { Toggle } from './ui/toggle';
import { List } from 'lucide-react'
import { LayoutGrid } from 'lucide-react'
import { BadgeHelp } from 'lucide-react';
import { HeartHandshake } from 'lucide-react'
import {RefreshCcw} from 'lucide-react'


// Contains the search bar , the buttons and grid-list toggle
function HeroBar(){
    const {isOpen,openModal,closeModal}=useModal()  //how do I change this one?
    const {displayRequests} = useRequestContext()
    const languageRef=useRef()
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
                <div className="h-64 w-full bg-gray-50 flex items-center justify-center p-4">
                    <SearchBar/>
                <div/>
            </div>
            </div>
            <div className="flex justify-between items-center gap-3">
                <CustomButton onClick={openModal} label="Ask For Help" icon={BadgeHelp} />
                <CustomButton  label="Browse Help Requests" icon={HeartHandshake} />
            </div>
            <div className="flex justify-between items-center gap-3">
                <Toggle>
                    <List/>
                </Toggle>
                <Toggle>
                    <LayoutGrid/>
                </Toggle>
                <RefreshCcw onClick={Refresh} className="hover:bg-gray-300"/>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal} >
                <CodeEditor onComplete={closeModal}/>
            </Modal>
        </div>

    )
}


export {HeroBar}