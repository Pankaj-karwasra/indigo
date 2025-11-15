import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/testimonials/";

// ================================================================
//                     ASYNC THUNKS
// ================================================================

// ------------------- CREATE -------------------
export const createTestimonials = createAsyncThunk(
  "testimonials/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- GET ALL -------------------
export const getAllTestimonials = createAsyncThunk(
  "testimonials/getAll",
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
export const getTestimonialsById = createAsyncThunk(
  "testimonials/getOne",
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
export const updateTestimonials = createAsyncThunk(
  "testimonials/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------- DELETE -------------------
export const deleteTestimonials = createAsyncThunk(
  "testimonials/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      return id; // return the deleted id
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================================================================
//                     SLICE
// ================================================================

const testimonialSlice = createSlice({
  name: "testimonials",

  initialState: {
    testimonials: [],
    testimonialDetails: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // ---------------- CREATE ----------------
      .addCase(createTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials.push(action.payload);
      })
      .addCase(createTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- GET ALL ----------------
      .addCase(getAllTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(getAllTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- GET BY ID ----------------
      .addCase(getTestimonialsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTestimonialsById.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonialDetails = action.payload;
      })
      .addCase(getTestimonialsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- UPDATE ----------------
      .addCase(updateTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = state.testimonials.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- DELETE ----------------
      .addCase(deleteTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = state.testimonials.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testimonialSlice.reducer;
