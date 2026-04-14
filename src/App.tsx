import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { VoiceProvider } from "@/contexts/VoiceContext";

// Pages
import StaffLogin from "@/pages/StaffLogin";
import HospitalRegisterPage from "./authentication/Hospital_Registration";
import AdminLogin from "./pages/AdminLogin";
import LocationDashboard from "./pages/LocationDashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import NotFound from "./pages/NotFound";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Patient from "./pages/Patient";
import Record from "./pages/Record";
import Reception from "./pages/Reception";
import Staff from "./pages/Staff";
import PharmacyPrescriptions from "./pages/PharmacyPrescriptions";
import PharmacyInventory from "./pages/PharmacyInventory";
import PatientAuthentication from "./authentication/Patient_authentication";
import { Global } from "recharts";
import { GlobalVoiceController } from "./components/GlobalVoiceController";

const queryClient = new QueryClient();

const AppContent = () => {
  const navigate = useNavigate();

  // This function now works because it is inside the BrowserRouter context
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/locationdashboard");
  };

  return (
    <Auth0Provider
      domain="dev-0zj1jmigv86ldga3.us.auth0.com"
      clientId="FNEUFe0MtwOGdsZ9ZDmu5zQ9JuKupbMC"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <VoiceProvider>
            <GlobalVoiceController/>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<LandingPage />} />
              <Route path="/register/institution" element={<HospitalRegisterPage />} />
              <Route path="/authentication/Patient_authentication" element={<PatientAuthentication />} />
              <Route path="/login/patient" element={<LoginPage />} />
              <Route path="/login/staff" element={<StaffLogin />} />
              <Route path="/login/admin_login" element={<AdminLogin />} />
              <Route path="/locationdashboard" element={<LocationDashboard />} />
              <Route path="/dashboard/patient" element={<PatientDashboard />} />
              <Route path="/doctor" element={<DoctorDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/pharmacy" element={<PharmacyDashboard />} />
              
              {/* Patient Routes */}
              <Route path="/patient/appointments" element={<Appointments />} />
              <Route path="/patient/prescriptions" element={<Prescriptions />} />
              <Route path="/patient/notifications" element={<Notifications />} />
              <Route path="/patient/profile" element={<Profile />} />
              
              {/* Doctor Routes */}
              <Route path="/doctor/patients" element={<Patient />} />
              <Route path="/doctor/records" element={<Record />} />
              
              {/* Admin Routes */}
              <Route path="/admin/reception" element={<Reception />} />
              <Route path="/admin/staff" element={<Staff />} />
              
              {/* Pharmacy Routes */}
              <Route path="/pharmacy/prescriptions" element={<PharmacyPrescriptions />} />
              <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
          </VoiceProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}