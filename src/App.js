// App.js or Router.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import { useAuth } from './hooks/useAuth'; // custom hook to fetch user info

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/resume-builder" element={<LandingPage />} />
        <Route path="/resume-builder/build" element={user ? <ResumeBuilderPage apiUser={user} /> : <Navigate to="/resume-builder" />} />
      </Routes>
    </Router>
  );
}

export default App;
