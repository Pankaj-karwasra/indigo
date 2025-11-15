import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTestimonials } from "../redux/testimonialSlice";

const Testimonial = () => {
  const dispatch = useDispatch();

  const { testimonials, loading } = useSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <section id="testi">
      <div className="container">
        <div className="row">
          <h2 className="text-center mb-4">Testimonials</h2>

          {testimonials && testimonials.length > 0 ? (
            testimonials.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card h-100 shadow">

                  {/* Image */}
                  <img
                    src={
                      item.image_url
                        ? item.image_url
                        : "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    className="card-img-top mx-auto"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body text-center">
                    <p className="card-text">
                      <i className="bi bi-quote fs-4"></i>
                      {item.description}
                      <i className="bi bi-quote fs-4"></i>
                    </p>

                    <h5 className="card-title fw-bold">{item.title}</h5>

                    <button className="btn btn-success w-100 mt-2">
                      Click
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No testimonials found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
