import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTeam, deleteTeam } from "../../../redux/teamSlice";

const TeamList = () => {
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getAllTeam());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteTeam(id));
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Team List</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.title}</td>
              <td>
                {m.image_url && (
                  <img src={m.image_url} width="60" alt="Team" />
                )}
              </td>

              <td>
                <Link
                  to={`/admin/team/edit/${m.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(m.id)}
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

export default TeamList;
