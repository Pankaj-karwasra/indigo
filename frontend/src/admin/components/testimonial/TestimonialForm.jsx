import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createTestimonials,
  updateTestimonials,
  getTestimonialsById,
} from "../../../redux/testimonialSlice";
import { useDispatch, useSelector } from "react-redux";

const TestimonialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { testimonialDetails, loading } = useSelector(
    (state) => state.testimonials
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [existingImage, setExistingImage] = useState(null);

  // Fetch testimonial if editing
  useEffect(() => {
    if (id) {
      dispatch(getTestimonialsById(id));
    }
  }, [id, dispatch]);

  // Populate fields when data arrives
  useEffect(() => {
    if (testimonialDetails && id) {
      setFormData({
        title: testimonialDetails.title || "",
        description: testimonialDetails.description || "",
        image: "",
      });

      setExistingImage(testimonialDetails.image_url || null);
    }
  }, [testimonialDetails, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (formData.image) data.append("image", formData.image);

    if (id) {
      await dispatch(updateTestimonials({ id, formData: data }));
    } else {
      await dispatch(createTestimonials(data));
    }

    navigate("/admin/testimonial/list");
  };

  return (
    <div>
      <h2>{id ? "Edit Testimonial" : "Add Testimonial"}</h2>

      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3">
        <label>Image</label>
        <input type="file" className="form-control" onChange={handleFile} />
      </div>

      {/* Show existing image while editing */}
      {id && existingImage && (
        <div className="mb-3">
          <label>Existing Image:</label>
          <br />
          <img
            src={existingImage}
            alt="testimonial"
            width="120"
            height="120"
            style={{ objectFit: "cover", borderRadius: "6px" }}
          />
        </div>
      )}

      <button className="btn btn-primary" onClick={handleSubmit}>
        {loading ? "Saving..." : id ? "Update Testimonial" : "Save Testimonial"}
      </button>
    </div>
  );
};

export default TestimonialForm;
  