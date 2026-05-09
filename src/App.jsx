// App.jsx

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import StoryPage from "./pages/StoryPage";
import AboutAuthor from "./pages/AboutAuthor";
import InstagramRedirect from "./component/InstagramRedirect";
import AuthPage from "./pages/AuthPage";

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("token");

  return token ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <>
      <InstagramRedirect />

      <HashRouter>
        <Routes>
          {/* Auth Page */}
          <Route path="/" element={<AuthPage />} />

          {/* Protected Home Route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Protected Story Route */}
          <Route
            path="/story/:id"
            element={
              <ProtectedRoute>
                <StoryPage />
              </ProtectedRoute>
            }
          />

          {/* Protected About Route */}
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutAuthor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;