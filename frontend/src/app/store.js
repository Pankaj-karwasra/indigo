import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import serviceReducer from "../redux/serviceSlice";
import testimonialReducer from "../redux/testimonialSlice"
import teamReducer from "../redux/teamSlice";
import queryReducer from "../redux/querySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    service: serviceReducer,
    testimonials: testimonialReducer,
    team: teamReducer,
    query:queryReducer,
    
  },
});
