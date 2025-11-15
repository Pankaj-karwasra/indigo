import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQueries, deleteQuery } from "../../../redux/querySlice";

const QueryList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.query);

  useEffect(() => {
    dispatch(fetchQueries());
  }, [dispatch]);

  return (
    <div>
      <h2>Query List</h2>

      {loading && <p>Loading...</p>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Query</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>{item.email}</td>
              <td>{item.query}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(deleteQuery(item._id))}
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

export default QueryList;
