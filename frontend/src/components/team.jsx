import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeam } from "../redux/teamSlice";

const Team = () => {
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getAllTeam());
  }, [dispatch]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <section id="profiles">
      <div className="container">
        <div className="row">
          <h2>Team</h2>

          <div className="col-md-12 d-flex flex-wrap justify-content-center gap-3">

            {teams.map((member) => (
              <div className="card" style={{ width: "12rem" }} key={member.id}>

                <img
                  src={
                    member.image_url
                      ? member.image_url
                      : "https://via.placeholder.com/150x150?text=No+Image"
                  }
                  className="card-img-top mx-auto"
                  alt={member.name}
                  style={{ height: "150px", objectFit: "cover" }}
                />

                <div className="card-body text-center">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text">{member.title}</p>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
