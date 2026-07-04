import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CalendarPage from "./pages/CalendarPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyEvents from "./pages/MyEvents";
import AdminDemo from "./pages/AdminDemo";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-demo"
          element={
            <AdminRoute>
              <AdminDemo />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

