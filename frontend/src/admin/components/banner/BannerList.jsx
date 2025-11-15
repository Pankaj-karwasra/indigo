import React, { useState } from "react";
import { Link } from "react-router-dom";

const BannerList = () => {
  const [banners, setBanners] = useState([
    { id: 1, title: "Welcome Banner", image: "banner.jpg", buttonText: "Learn More" },
    { id: 2, title: "Summer Sale", image: "sale.jpg", buttonText: "Shop Now" },
  ]);

  const deleteBanner = (id) => {
    setBanners(banners.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h2>Banner List</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Button Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id}>
              <td>{banner.title}</td>
              <td>{banner.image}</td>
              <td>{banner.buttonText}</td>
              <td>
                <Link
                  to={`/admin/banner/edit/${banner.id}`}
                  state={{ banner }}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteBanner(banner.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannerList;
