import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/slices/authSlice";
import healthReducer from "../redux/slices/healthSlice";
import patientReducer from "../redux/slices/patientSlice";
import hospitalReducer from "../redux/slices/hospitalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    health: healthReducer,
    patient: patientReducer,
    hospital: hospitalReducer,
  },
});
