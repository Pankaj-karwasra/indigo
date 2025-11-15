import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/services/";

// ------------------- CREATE -------------------
export const createService = createAsyncThunk(
  "service/createService",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- GET ALL -------------------
export const getAllServices = createAsyncThunk(
  "service/getAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- GET ONE -------------------
export const getServiceById = createAsyncThunk(
  "service/getServiceById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}${id}/`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- UPDATE -------------------
export const updateService = createAsyncThunk(
  "service/updateService",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- DELETE -------------------
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- Slice -------------------
const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: [],
    serviceDetails: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })

      // GET ALL
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })

      // GET BY ID
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.serviceDetails = action.payload;
      })

      // UPDATE
      .addCase(updateService.fulfilled, (state, action) => {
        state.services = state.services.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })

      // DELETE
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter((s) => s.id !== action.payload);
      });
  },
});

export default serviceSlice.reducer;
