import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllTestimonials,
  deleteTestimonials,
} from "../../../redux/testimonialSlice";
import { useDispatch, useSelector } from "react-redux";

const TestimonialList = () => {
  const dispatch = useDispatch();
  const { testimonials, loading } = useSelector(
    (state) => state.testimonials
  );

  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      await dispatch(deleteTestimonials(id));
      dispatch(getAllTestimonials());
    }
  };

  return (
    <div>
      <h2>Testimonial List</h2>

      {loading && <p>Loading...</p>}

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th style={{ width: "120px" }}>Image</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {testimonials.length > 0 ? (
            testimonials.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.description}</td>

                <td>
                  <img
                    src={
                      t.image_url
                        ? t.image_url
                        : "https://via.placeholder.com/80x80?text=No+Image"
                    }
                    width="80"
                    height="80"
                    alt="testimonial"
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                </td>

                <td>
                  <Link
                    to={`/admin/testimonial/edit/${t.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No testimonials found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialList;
