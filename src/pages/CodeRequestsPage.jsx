import { NavBar } from "@/components/Navbar";//fckin change this navbar
import { HeroBar } from "@/components/HeroBar";
import { DynamicGrid } from "@/components/DynamicGrid";
import { SideBar } from "@/components/SideBar";
import { useRequestContext } from "@/context/requestContext";



function CodeRequestsPage(){
    const {requests}=useRequestContext()
    return(
        <div className='flex h-full'>
            <div id="sinistral">
                <div className="h-full w-16  hover:w-54 sticky text-center bg-blue-200 border-amber-700">Sidebar for now</div>
            </div>
            <div id="dexter" className="flex flex-col items-around w-full">
                <NavBar/>
                <HeroBar/>
                <DynamicGrid items={requests}/>
            </div>
        </div>
    )
}

export {CodeRequestsPage}