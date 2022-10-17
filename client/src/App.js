import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import LawyerRegistration from "./pages/LawyerRegistration";
import ClientRegistration from "./pages/ClientRegistration";
import Login from "./pages/Login";
import About from "./pages/About";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LawyerDashboard from './pages/LawyerDashboard'
import { AnimatePresence } from "framer-motion";

function App() {

  return (
    <div className="App">
      <Router>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-lawyer" element={<LawyerRegistration />} />
            <Route path="/register-client" element={<ClientRegistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </AnimatePresence>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
