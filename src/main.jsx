import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './pages/Dashboard.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateItem from './pages/CreateItem';
import Navbar from "./components/Navbar";
import { Toaster } from './components/ui/sonner';
import About from './pages/About';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar />
        <Routes>
          {/* Define Routes */}
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createItem" element={<CreateItem />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
  </StrictMode>,
)
