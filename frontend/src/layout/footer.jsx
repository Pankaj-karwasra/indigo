import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuery } from "../redux/querySlice";

const Footer = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    query: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Query
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createQuery(formData))
      .unwrap()
      .then(() => {
        alert("Query submitted successfully!");
        setFormData({ email: "", query: "" });
      })
      .catch(() => {
        alert("Failed to submit query");
      });
  };

  return (
    <>
      <section id="footer">
        <img src="media/border2.png" alt="" id="border-img" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img src="media/logo.png" alt="" id="footer-logo" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, perferendis.
              </p>
            </div>

            <div className="col-md-4">
              <table>
                <h2>Indigo Pvt Ltd.</h2>
                <tbody>
                  <tr>
                    <td><i className="bi bi-buildings"></i></td>
                    <td><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, illum.</p></td>
                  </tr>
                  <tr>
                    <td><i className="bi bi-telephone"></i></td>
                    <td><p>014145879</p></td>
                  </tr>
                  <tr>
                    <td><i className="bi bi-phone"></i></td>
                    <td><p>9874563210</p></td>
                  </tr>
                  <tr>
                    <td><i className="bi bi-envelope"></i></td>
                    <td><p>pankajjaat913@gmail.com</p></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Query Section Integrated */}
            <div className="col-md-4">
              <form onSubmit={handleSubmit}>
                <h2>Query Form</h2>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <textarea
                  className="form-control mt-2"
                  placeholder="Enter Query"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  required
                ></textarea>

                <button type="submit" className="btn btn-danger form-control mt-2">
                  Post Query
                </button>
              </form>
            </div>

          </div>
        </div>

        <div className="container mt-4">
          <div className="row text-center">
            <div className="col-md-12">
              <a href="#"><img src="media/instagram-icon.png" alt="" /></a>
              <a href="#"><img src="media/linkedin-icon.png" alt="" /></a>
              <a href="#"><img src="media/snapchat-icon.png" alt="" /></a>
              <a href="#"><img src="media/twitter-icon.png" alt="" /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
