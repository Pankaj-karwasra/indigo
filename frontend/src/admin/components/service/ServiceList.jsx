import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices, deleteService } from "../../../redux/serviceSlice";
import { Link } from "react-router-dom";

const ServiceList = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteService(id));
  };

  return (
    <div>
      <h2>Service List</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.title}</td>
              <td>{s.description}</td>
              <td>{s.image}</td>
              <td>
                <Link
                  to={`/admin/service/edit/${s.id}`}
                  state={{ service: s }}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s.id)}
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

export default ServiceList;
