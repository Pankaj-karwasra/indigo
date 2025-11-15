import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/teamss";

// CREATE TEAM
export const createTeam = createAsyncThunk(
  "team/create",
  async (formData) => {
    const res = await axios.post(`${API_URL}/`, formData);
    return res.data;
  }
);

// GET ALL TEAMS
export const getAllTeam = createAsyncThunk("team/getAll", async () => {
  const res = await axios.get(`${API_URL}/`);
  return res.data;
});

// GET TEAM BY ID
export const getTeamById = createAsyncThunk("team/getById", async (id) => {
  const res = await axios.get(`${API_URL}/${id}/`);
  return res.data;
});

// UPDATE TEAM
export const updateTeam = createAsyncThunk(
  "team/update",
  async ({ id, formData }) => {
    const res = await axios.put(`${API_URL}/${id}/`, formData);
    return res.data;
  }
);

// DELETE TEAM
export const deleteTeam = createAsyncThunk("team/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}/`);
  return id;
});

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    team: null,
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })

      // GET BY ID
      .addCase(getTeamById.fulfilled, (state, action) => {
        state.team = action.payload;
      })

      // CREATE
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      })

      // UPDATE
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.teams = state.teams.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
      })

      // DELETE
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.teams = state.teams.filter((t) => t.id !== action.payload);
      });
  },
});

export default teamSlice.reducer;
