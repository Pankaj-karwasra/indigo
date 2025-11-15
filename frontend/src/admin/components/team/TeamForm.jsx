import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createTeam,
  updateTeam,
  getTeamById,
} from "../../../redux/teamSlice";

const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { team } = useSelector((state) => state.team);

  const [teamData, setTeamData] = useState({
    name: "",
    title: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getTeamById(id));
    }
  }, [id]);

  useEffect(() => {
    if (team && id) {
      setTeamData({
        name: team.name,
        title: team.title,
        image: "",
      });
    }
  }, [team]);

  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setTeamData({ ...teamData, image: e.target.files[0] });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", teamData.name);
    formData.append("title", teamData.title);

    if (teamData.image) formData.append("image", teamData.image);

    if (id) {
      dispatch(updateTeam({ id, formData }));
    } else {
      dispatch(createTeam(formData));
    }

    navigate("/admin/team/list");
  };

  return (
    <div>
      <h2>{id ? "Edit Team Member" : "Add Team Member"}</h2>

      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={teamData.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Position / Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={teamData.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Image</label>
        <input type="file" className="form-control" onChange={handleFile} />

        {/* show preview for edit */}
        {id && team?.image_url && (
          <img
            src={team.image_url}
            alt="preview"
            width="100"
            className="mt-2"
          />
        )}
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>
        {id ? "Update Member" : "Save Member"}
      </button>
    </div>
  );
};

export default TeamForm;
