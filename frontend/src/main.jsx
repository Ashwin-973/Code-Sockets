import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'




createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <Auth0Provider
          domain="dev-dkz8xh43gj4g07cr.us.auth0.com" 
          clientId="TSm2sgE4KICjMxr2hrR30wMWLtgSi7CN"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}>
          <App/>
      </Auth0Provider>
      </BrowserRouter>
    </StrictMode>
)
