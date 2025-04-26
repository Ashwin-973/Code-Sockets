import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthProvider';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { Home } from "../pages/Home"
import { OnBoard } from '../components/feature/OnBoard';
import { CodeRequests } from '../pages/CodeRequests';
import { NotFound } from '../pages/NotFound';
// import Profile from '../pages/Profile';
//Route-level security  with public and protected routes
function Navigator() {
  return (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Onboarding is protected but accessible even if not onboarded */}
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute>
            <OnBoard />
          </ProtectedRoute>
        } 
      />
       {/* Collaborate requires both authentication and onboarding completed */}
       <Route 
        path="/collaborate" 
        element={
          <ProtectedRoute requireOnboarding={true}>
            <CodeRequests />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  </AuthProvider>
  );
}
export default Navigator;