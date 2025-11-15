import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../redux/serviceSlice";

const Service = () => {
  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  return (
    <>
      <section id="services">
        <div className="container">
          <div className="row">
            <h2>Services</h2>

            {services?.map((item) => (
              <div className="col-md-3" key={item.id}>
                <img
                  src={item.image}
                   alt={item.title}
                />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <button className="btn btn-success">More Details...</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
