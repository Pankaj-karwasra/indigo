import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Banner
import BannerForm from "./components/banner/BannerForm";
import BannerList from "./components/banner/BannerList";

// Service
import ServiceForm from "./components/service/ServiceForm";
import ServiceList from "./components/service/ServiceList";

// Testimonial
import TestimonialForm from "./components/testimonial/TestimonialForm";
import TestimonialList from "./components/testimonial/TestimonialList";

// Team
import TeamForm from "./components/team/TeamForm";
import TeamList from "./components/team/TeamList";

// Querh
import QueryList from "./components/query/QueryList";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard d-flex">
      <Sidebar />
      <div className="admin-content flex-grow-1 p-4">
        <Routes>
          {/* Banner */}
          <Route path="banner/add" element={<BannerForm />} />
            <Route path="banner/edit/:id" element={<BannerForm />} />
          <Route path="banner/list" element={<BannerList />} />

          {/* Service */}
          <Route path="service/add" element={<ServiceForm />} />
           <Route path="service/edit/:id" element={<ServiceForm />} />
          <Route path="service/list" element={<ServiceList />} />

          {/* Testimonial */}
          <Route path="testimonial/add" element={<TestimonialForm />} />
           <Route path="testimonial/edit/:id" element={<TestimonialForm />} />
          <Route path="testimonial/list" element={<TestimonialList />} />

          {/* Team */}
          <Route path="team/add" element={<TeamForm />} />
          <Route path="team/edit/:id" element={<TeamForm />} />
          <Route path="team/list" element={<TeamList />} />


          {/* Querh */}
          <Route path="query/list" element={<QueryList />} />

          {/* Default */}
          <Route path="*" element={<Navigate to="banner/list" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
