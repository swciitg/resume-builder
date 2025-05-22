import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import { useAuth } from "./hooks/useAuth";
import { PuffLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8f9fa",
          flexDirection: "column",
        }}
      >
        <PuffLoader color="#3f51b5" size={80} speedMultiplier={1} />
        <p
          style={{
            marginTop: 16,
            fontSize: 16,
            color: "#666",
            fontWeight: "500",
          }}
        >
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#f28b82", // soft reddish tone
            color: "#fff",
            fontSize: "14px",
            fontWeight: 500,
            padding: "8px 12px",
            borderRadius: "8px",
            minWidth: "200px",
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/resume-builder" replace />} />
          <Route
            path="/resume-builder/login"
            element={
              user ? <Navigate to="/resume-builder" replace /> : <LandingPage />
            }
          />
          <Route
            path="/resume-builder"
            element={
              user ? (
                <ResumeBuilderPage apiUser={user} />
              ) : (
                <Navigate to="/resume-builder/login" replace />
              )
            }
          />
        </Routes>
      </Router>
      a
    </div>
  );
}

export default App;
