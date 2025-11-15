import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

// REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/register/`, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Signup failed" });
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/login/`, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

const getStoredAuth = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || token === "null" || token === "undefined" || token.trim() === "") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null, token: null };
    }

    return { user, token };
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { user: null, token: null };
  }
};

const { user, token } = getStoredAuth();

const initialState = {
  user,
  token,
  loading: false,
  error: null,
  success: false,
};

// ---------------- FIXED SAFE TOKEN + USER EXTRACTION ---------------- //

const extractUser = (payload) => {
  return (
    payload?.data?.user ||
    payload?.user ||
    null
  );
};

const extractToken = (payload) => {
  return (
    payload?.data?.tokens?.access || // if Django returns nested tokens
    payload?.access ||              // if SimpleJWT returns directly
    payload?.token ||               // if backend uses token
    payload?.data?.token ||         // fallback
    null
  );
};

// -------------------------------------------------------------------- //

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const user = extractUser(action.payload);
        const token = extractToken(action.payload);

        state.user = user;
        state.token = token;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const user = extractUser(action.payload);
        const token = extractToken(action.payload);

        state.user = user;
        state.token = token;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
