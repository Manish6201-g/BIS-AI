import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingNavbar } from './components/landing/LandingNavbar';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AssistantPage } from './pages/AssistantPage';
import { ProductMatcherPage } from './pages/ProductMatcherPage';
import { CertificationWizardPage } from './pages/CertificationWizardPage';
import { VerifyIsiPage } from './pages/VerifyIsiPage';
import { VerifyHuidPage } from './pages/VerifyHuidPage';
import { StandardsExplorerPage } from './pages/StandardsExplorerPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { AuthPage } from './pages/AuthPage';

function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className={`flex flex-col min-h-screen ${isLanding ? 'bg-white text-black' : 'bg-gov-bg'}`}>
      {/* Editorial Minimal Navbar on Landing, Standard Portal Navbar on Functional Subpages */}
      {isLanding ? <LandingNavbar /> : <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/matcher" element={<ProductMatcherPage />} />
          <Route path="/certification" element={<CertificationWizardPage />} />
          <Route path="/verify-isi" element={<VerifyIsiPage />} />
          <Route path="/verify-huid" element={<VerifyHuidPage />} />
          <Route path="/standards" element={<StandardsExplorerPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPortalPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>

      {/* Global Footer on Functional Subpages, Integrated Kinetic Footer on Landing */}
      {!isLanding && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppLayout />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
