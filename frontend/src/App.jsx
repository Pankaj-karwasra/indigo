import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/header.jsx";
import Banner from "./layout/banner.jsx";
import Footer from "./layout/footer.jsx";
import Service from "./components/service.jsx";
import Testimonial from "./components/testimonial.jsx";
import Team from "./components/team.jsx";
import Login from "./auth/Login.jsx";
import Signup from "./auth/Signup.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Service />
                <Testimonial />
                <Team />
              </>
            }
          />
          <Route path="/service" element={<Service />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 Protect all admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
