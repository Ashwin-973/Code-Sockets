// import PortfolioGrid from "./components/ui/code-block-conatainer";
import { RequestProvider } from "./context/requestContext";
import { ModalProvider } from "./context/modelContext";
import { CodeRequestsPage } from "./pages/CodeRequestsPage";
import { AnimatedModalDemo } from "./components/EnhancedModal";

//set routing between pages...
function App() {
  return(
    <ModalProvider>
      <RequestProvider>
      <CodeRequestsPage/>  
      {/* <AnimatedModalDemo/> */}
    </RequestProvider>
    </ModalProvider>
    
  )
}


export default App;


