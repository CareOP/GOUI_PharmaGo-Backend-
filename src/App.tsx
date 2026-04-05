import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/pharmacy" element={<PharmacyDashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/patient/appointments" element={<Appointments />} />
            <Route path="/patient/prescriptions" element={<Prescriptions />} />
            <Route path="/patient/notifications" element={<Notifications />} />
            <Route path="/patient/profile" element={<Profile />} />
            <Route path="/doctor/patients" element={<Patient />} />
            <Route path="/doctor/records" element={<Record />} />
            <Route path="/admin/reception" element={<Reception />} />
            <Route path="/admin/staff" element={<Staff />} />
            <Route path="/pharmacy/prescriptions" element={<PharmacyPrescriptions />} />
            <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);


export default App;
