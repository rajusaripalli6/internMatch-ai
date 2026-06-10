import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Dashboard from "./pages/student/Dashboard"
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard"
import ProtectedRoute from "./components/protected/ProtectedRoute"
import Internships
from "./pages/Internships"
import MyApplications
from "./pages/student/MyApplications"
import CreateInternship
from "./pages/recruiter/CreateInternship"
import Profile
from "./pages/student/Profile"
import RecruiterApplicants
from "./pages/recruiter/RecruiterApplicants"
function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        
        <Route path="/internships" element={<Internships />}/>
              <Route

                  path="/my-applications"

                  element={
                    <ProtectedRoute>
                      <MyApplications />
                    </ProtectedRoute>
                  }

                />
        <Route
            path="/recruiter/dashboard"
            element={
              <ProtectedRoute>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-internship"
            element={
              <ProtectedRoute>
                <CreateInternship />
              </ProtectedRoute>
            }
          />
          <Route
              path="/profile"
                element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }

          />
          <Route
          path="/recruiter/applicants"
              element={
              <ProtectedRoute>
                <RecruiterApplicants />
              </ProtectedRoute>

            }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App