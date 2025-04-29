import { RequestProvider } from "../context/requestContext";
import { ModalProvider } from "../context/modelContext";

import { TheSidebar } from "../components/layout/SideBar";



function CodeRequests(){
    return(
            <ModalProvider>
                <RequestProvider>
                    <TheSidebar/>  
                </RequestProvider>
            </ModalProvider>
    )
}

export {CodeRequests}