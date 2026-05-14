import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages & Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Patient Pages
import Dashboard from "./pages/patient/Dashboard";
import PatientProfileSetup from "./pages/patient/ProfileSetup";

// Hospital Pages
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import HospitalProfileSetup from "./pages/hospital/ProfileSetup";

// Layouts
import PatientLayout from "./layouts/PatientLayout";
import HospitalLayout from "./layouts/HospitalLayout";

// Route Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import PatientRoute from "./routes/PatientRoute";
import HospitalRoute from "./routes/HospitalRoute";

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= PATIENT ROUTES ================= */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <PatientRoute>
                <PatientLayout />
              </PatientRoute>
            </ProtectedRoute>
          }
        >
          {/* Patient Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Patient Profile Setup */}
          <Route
            path="setup"
            element={
              <ProtectedRoute>
                <PatientProfileSetup />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ================= HOSPITAL ROUTES ================= */}
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <HospitalRoute>
                <HospitalLayout />
              </HospitalRoute>
            </ProtectedRoute>
          }
        >
          {/* Hospital Dashboard */}
          <Route index element={<HospitalDashboard />} />

          {/* Hospital Profile Setup */}
          <Route
            path="setup"
            element={
              <ProtectedRoute>
                <HospitalProfileSetup />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ================= DEFAULT REDIRECT ================= */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
