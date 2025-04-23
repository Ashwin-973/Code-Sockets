// import { NavBar } from "./Navbar"
import { Header } from "./Header"
import { HeroBar } from "./HeroBar"
import { DynamicGrid } from "./DynamicGrid"
import { useRequestContext } from "../context/requestContext"


function Dexter(){
    const {requests}=useRequestContext()
    return(
        <div className="flex flex-1">
            <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
            <div id="dexter" className="flex flex-col items-around w-full">
                <Header/>
                <HeroBar/>
                <DynamicGrid items={requests}/>
            </div>
            </div>
        </div>
    )
}


export {Dexter}