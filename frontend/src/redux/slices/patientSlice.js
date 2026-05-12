import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  patients: [],
};

const patientSlice = createSlice({
  name: "patient",

  initialState,

  reducers: {
    setPatientProfile: (state, action) => {
      state.profile = action.payload;
    },

    setPatients: (state, action) => {
      state.patients = action.payload;
    },
  },
});

export const { setPatientProfile, setPatients } = patientSlice.actions;

export default patientSlice.reducer;
