import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createService, updateService } from "../../../redux/serviceSlice";

const ServiceForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [service, setService] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (location.state?.service) {
      setService(location.state.service);
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setService({ ...service, image: e.target.files[0] });
    } else {
      setService({ ...service, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", service.title);
    formData.append("description", service.description);
    if (service.image instanceof File) {
      formData.append("image", service.image);
    }

    if (id) {
      dispatch(updateService({ id, formData }));
      alert("Service Updated");
    } else {
      dispatch(createService(formData));
      alert("Service Added");
    }

    navigate("/admin/service/list");
  };

  return (
    <div>
      <h2>{id ? "Edit Service" : "Add Service"}</h2>

      <div className="mb-3">
        <label>Service Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={service.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea
          name="description"
          className="form-control"
          value={service.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3">
        <label>Choose Image</label>
        <input type="file" name="image" onChange={handleChange} />
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>
        {id ? "Update Service" : "Save Service"}
      </button>
    </div>
  );
};

export default ServiceForm;
