import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liveData: [],
  reports: [],
  alerts: [],
};

const healthSlice = createSlice({
  name: "health",

  initialState,

  reducers: {
    setLiveData: (state, action) => {
      state.liveData.push(action.payload);

      if (state.liveData.length > 20) {
        state.liveData.shift();
      }
    },

    setReports: (state, action) => {
      state.reports = action.payload;
    },

    addAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
  },
});

export const { setLiveData, setReports, addAlert } = healthSlice.actions;

export default healthSlice.reducer;
