// src/redux/querySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/query";

// CREATE
export const createQuery = createAsyncThunk(
  "query/createQuery",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/add`, payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET ALL
export const fetchQueries = createAsyncThunk(
  "query/fetchQueries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/get`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE
export const deleteQuery = createAsyncThunk(
  "query/deleteQuery",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const querySlice = createSlice({
  name: "query",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // fetch all
      .addCase(fetchQueries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQueries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchQueries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // delete
      .addCase(deleteQuery.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteQuery.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default querySlice.reducer;
