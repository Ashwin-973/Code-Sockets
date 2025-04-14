"use client";
import { motion } from "framer-motion";
import Modal from './Modal';
import {useModal} from '../context/modelContext'
import { useRequestContext } from "../context/requestContext";
import { CodeBlock } from "./ui/code-block";
import CodeEditor from "./CodeEditor"
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"; 
import { Button } from "./ui/button";  //change this to serenity Ui's tech stack button
import { IconUrgent } from "@tabler/icons-react";
import {CircleCheckBig} from "lucide-react"
import {UserRoundCheck} from "lucide-react"
import {Trash2} from 'lucide-react'
import {Pencil} from 'lucide-react'

const id='auth0|summerfinn'
const skill_level='moderate'

function DynamicGrid({items}) {
    const {isOpen,openModal,closeModal}=useModal()
    const { selectRequest,removeRequest } = useRequestContext();
    items=items.filter((item)=>
    {
        return item.user_id===id || item.skill_level_required===skill_level || item.skill_level_required==="free to all"  //id would come from the current authenticated user
    })
      const handleRequestClick = (item) => {
        selectRequest(item);
        openModal();
      };
      const handleUpdate = (item) => {
        selectRequest(item);
        openModal();
      };
      const handleHelp=(item)=>
      {
        selectRequest(item);
        openModal();
      }
      const handleDelete=async(itemId)=>
      {
        try{
          await removeRequest(itemId)
        }
        catch(err)
        {
          console.log("Delete functionality failed")
        }

      }
  return (
    <section className="my-5">
        {items.length===0?(
            <div className="grid grid-cols-1 px-5 pb-10 lg:px-16 lg:pb-16">
                 <motion.article
                className="relative group shadow-lg overflow-y-scroll overflow-x-hidden rounded-xl"
                >
                <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-124 w-full"
                >
                <img src="https://i.pinimg.com/736x/a1/85/30/a18530156b801a7b5360c3dc3a05e16e.jpg"
                alt="No requests found"
                height={600}
                width={1200}
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out rounded-xl"/>
                </motion.div>
                </motion.article>
            </div>

        ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-5 pb-10 lg:px-16 lg:pb-16">  {/*Just filter out items by skill */}
        {items.map((item) => (
          <motion.article
            key={item.id}
            className="relative group shadow-lg overflow-y-scroll overflow-x-hidden rounded-xl"
          >
            <div className="flex flex-col gap-6">
                <div className="bg-gray-300 border border-gray-400 p-2 rounded-lg flex justify-around items-center ">
                    <div className="flex justify-center items-center gap-6">
                        <Avatar>  {/*How do I dynamically populate the avatar?*/}
                            <AvatarImage src="https://i.pinimg.com/736x/b3/a7/33/b3a733480dcc957f5359941e60f4ad7c.jpg" alt="Mr.White" />
                            <AvatarFallback>WW</AvatarFallback>
                        </Avatar>
                        <Button variant="secondary">{item.language}</Button>
                    </div>
                    <div className="flex justify-center items-center gap-3">
                        <UserRoundCheck color={item.status==="solved"?"#50ee07":"#ffffff"}/>
                        <CircleCheckBig color={!item.is_open?"#50ee07":"#ffffff"}/>
                    </div>
                    <div className="flex items-center">
                        <IconUrgent color={item.urgent_toggle?"#eb0d0d":"#ffffff"}/>
                    </div>
                </div>
                <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-124 w-full cursor-pointer"
                onClick={() => handleRequestClick(item)}
                >
                    <CodeBlock language="jsx" filename="Samples.jsx" code={item.content}  className="w-[1200px] h-[600px]  object-cover transition-transform duration-500 ease-in-out rounded-xl"/>
                </motion.div>
                { item.user_id===id?(
                    <div className="bg-gray-200 border border-gray-300 relative  z-50 p-2 rounded-lg flex justify-around items-center"> {/*BOTTOM BAR GET'S HIDDEN WHEN CODEBLOCK HAS OVERFLOW IN Y-AXIS*/}
                    <Pencil className="cursor-pointer" onClick={()=>
                      handleUpdate(item)}/>   {/* HOW TO CREATE HOVER EFFECTS ON THESE ICONS , MAYBE WRAP INSIDE OF A BUTTON*/}
                    <Trash2 className="cursor-pointer" color="#eb0d0d" onClick={()=>
                      handleDelete(item.id)
                    }/>
                </div>):(
                    <div className="bg-gray-200 border border-gray-300  relative z-50 p-2 rounded-lg flex justify-end items-center">
                      <Button varaint="outline" onClick={()=>{
                        handleHelp(item)
                      }}>Help</Button>
                    </div>
                )}
            </div>
          </motion.article>
        ))}
      </div>)}
        <Modal isOpen={isOpen} onClose={closeModal} >
            <CodeEditor onComplete={closeModal} />
        </Modal>
    </section>
  );
}

export {DynamicGrid}