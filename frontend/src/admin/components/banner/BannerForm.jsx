import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const BannerForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [banner, setBanner] = useState({ title: "", image: "", buttonText: "" });

  useEffect(() => {
    // Check if we have banner data (from Link state)
    if (location.state?.banner) {
      setBanner(location.state.banner);
    } else if (id) {
      // Fallback: Load mock data if directly visiting edit URL
      const mockBanners = [
        { id: 1, title: "Welcome Banner", image: "banner.jpg", buttonText: "Learn More" },
        { id: 2, title: "Summer Sale", image: "sale.jpg", buttonText: "Shop Now" },
      ];
      const existing = mockBanners.find((b) => b.id === parseInt(id));
      if (existing) setBanner(existing);
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (id) {
      alert("Banner updated (frontend only)");
    } else {
      alert("Banner added (frontend only)");
    }
    console.log(banner);
    navigate("/admin/banner/list");
  };

  return (
    <div>
      <h2>{id ? "Edit Banner" : "Add Banner"}</h2>

      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={banner.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          className="form-control"
          value={banner.image}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Button Text</label>
        <input
          type="text"
          name="buttonText"
          className="form-control"
          value={banner.buttonText}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>
        {id ? "Update" : "Save"}
      </button>
    </div>
  );
};

export default BannerForm;
