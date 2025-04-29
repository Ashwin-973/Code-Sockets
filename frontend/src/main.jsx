import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import { ScrollProgress } from "./components/common/ScrollProgress";
import App from './App'




createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <ScrollProgress/>
          <App/>
      </BrowserRouter>
    </StrictMode>
)
