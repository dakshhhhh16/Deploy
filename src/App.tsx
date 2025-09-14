import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import NGODashboard from "./components/NGODashboard";
import VerifierDashboard from "./components/VerifierDashboard";
import ProjectVerificationWorkspace from "./components/ProjectVerificationWorkspace";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import SolanaWalletProvider from "./components/WalletProvider";

// Import Solana wallet styles
import "@solana/wallet-adapter-react-ui/styles.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SolanaWalletProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/ngo-dashboard"
              element={
                <PrivateRoute allowedRoles={["NGO"]}>
                  <NGODashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/verifier-dashboard"
              element={
                <PrivateRoute allowedRoles={["Verifier"]}>
                  <VerifierDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/project/:projectId"
              element={
                <PrivateRoute allowedRoles={["Verifier"]}>
                  <ProjectVerificationWorkspace />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SolanaWalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
