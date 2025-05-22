
// App.js or Router.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import { useAuth } from './hooks/useAuth'; // custom hook to fetch user info
import { PuffLoader } from 'react-spinners';


function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f8f9fa',
          flexDirection: 'column',
        }}
      >
        <PuffLoader color="#3f51b5" size={80} speedMultiplier={1} />
        <p style={{ marginTop: 16, fontSize: 16, color: '#666' }}>Loading...</p>
      </div>
    );
  
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/resume-builder' replace />} />
        <Route path="/resume-builder/login" element={<LandingPage />} />
        <Route path="/resume-builder/" element={user ? <ResumeBuilderPage apiUser={user} /> : <Navigate to="/resume-builder/login" />} />
      </Routes>
    </Router>
  );
}
export default App;
