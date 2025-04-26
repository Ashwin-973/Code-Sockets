import { RequestProvider } from "../context/requestContext";
import { ModalProvider } from "../context/modelContext";
import { UserProvider } from "../context/userContext";

import { TheSidebar } from "../components/layout/SideBar";



function CodeRequests(){
    return(
        <UserProvider>
            <ModalProvider>
                <RequestProvider>
                    <TheSidebar/>  
                </RequestProvider>
            </ModalProvider>
        </UserProvider>
    )
}

export {CodeRequests}