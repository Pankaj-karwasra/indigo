import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());  // ✅ clear Redux + localStorage
    alert("Logged out successfully!");
    navigate("/login");  // redirect to login
  };

  return (
    <div className="sidebar bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
      <h3 className="text-center mb-4">Admin Panel</h3>
      <ul className="nav flex-column">
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/banner/list">Banner List</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/banner/add">Add Banner</Link></li>

        <li className="nav-item"><Link className="nav-link text-white" to="/admin/service/list">Service List</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/service/add">Add Service</Link></li>

        <li className="nav-item"><Link className="nav-link text-white" to="/admin/testimonial/list">Testimonial List</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/testimonial/add">Add Testimonial</Link></li>

        <li className="nav-item"><Link className="nav-link text-white" to="/admin/team/list">Team List</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/team/add">Add Team</Link></li>


        <li className="nav-item"><Link className="nav-link text-white" to="/admin/query/list">Query List</Link></li>



        
      </ul>

      <button className="btn btn-danger w-100 mt-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
