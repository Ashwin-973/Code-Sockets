// import PortfolioGrid from "./components/ui/code-block-conatainer";
import { RequestProvider } from "./context/requestContext";
import { ModalProvider } from "./context/modelContext";
import { UserProvider } from "./context/userContext";
import { CodeRequestsPage } from "./pages/CodeRequestsPage";
import FooterSecond from "./components/Footer";
import { TheSidebar } from "./components/SideBar";

//set routing between pages...
function App() {
  return(
    <UserProvider>
      <ModalProvider>
        <RequestProvider>
        <CodeRequestsPage/>  
        {/* <TheSidebar/> */}
      </RequestProvider>
      </ModalProvider>
     </UserProvider>
  )
}


export default App;


