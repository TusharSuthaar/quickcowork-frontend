import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrowseSpaces from "./pages/BrowseSpaces";
import SpaceDetails from "./pages/SpaceDetails";
import ListYourSpace from "./pages/ListYourSpace";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import BookingSuccess from "./pages/BookingSuccess";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<BrowseSpaces />} />
                <Route path="/space/:id" element={<SpaceDetails />} />
                <Route path="/login" element={
                  <AuthLayout requireAuth={false}>
                    <Login />
                  </AuthLayout>
                } />
                <Route path="/signup" element={
                  <AuthLayout requireAuth={false}>
                    <Signup />
                  </AuthLayout>
                } />
                <Route path="/list-space" element={
                  <ProtectedRoute>
                    <ListYourSpace />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
                <Route path="/booking-success" element={
                  <ProtectedRoute>
                    <BookingSuccess />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
