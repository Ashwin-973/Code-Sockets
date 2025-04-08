import { RequestProvider } from "./context/requestContext";
import { CodeRequestsPage } from "./pages/CodeRequestsPage";

//set routing between pages...
function App() {
  return(
    <RequestProvider>
      <CodeRequestsPage/>  
    </RequestProvider>
  )
}


export default App;
