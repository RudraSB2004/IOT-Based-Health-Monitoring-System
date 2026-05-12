import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  assignedPatients: [],
};

const hospitalSlice = createSlice({
  name: "hospital",

  initialState,

  reducers: {
    setHospitalProfile: (state, action) => {
      state.profile = action.payload;
    },

    setAssignedPatients: (state, action) => {
      state.assignedPatients = action.payload;
    },
  },
});

export const { setHospitalProfile, setAssignedPatients } =
  hospitalSlice.actions;

export default hospitalSlice.reducer;
