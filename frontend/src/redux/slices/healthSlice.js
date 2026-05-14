import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latestVitals: {
    temperature: 0,

    humidity: 0,

    heartRate: 0,

    spo2: 0,

    status: "normal",
  },

  ecgStream: [],

  reports: [],

  alerts: [],

  connectionStatus: false,
};

const healthSlice = createSlice({
  name: "health",

  initialState,

  reducers: {
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },

    setLiveData: (state, action) => {
      const payload = action.payload;

      state.latestVitals = {
        temperature: payload.temperature,

        humidity: payload.humidity,

        heartRate: payload.heartRate,

        spo2: payload.spo2,

        status: payload.status,
      };

      if (payload.ecg && Array.isArray(payload.ecg)) {
        state.ecgStream.push(...payload.ecg);

        if (state.ecgStream.length > 500) {
          state.ecgStream = state.ecgStream.slice(-500);
        }
      }
    },

    setReports: (state, action) => {
      state.reports = action.payload;
    },

    addAlert: (state, action) => {
      state.alerts.unshift(action.payload);

      // LIMIT ALERTS

      if (state.alerts.length > 20) {
        state.alerts.pop();
      }
    },

    // ==================================
    // CLEAR ALERTS
    // ==================================

    clearAlerts: (state) => {
      state.alerts = [];
    },
  },
});

export const {
  setLiveData,

  setReports,

  addAlert,

  clearAlerts,

  setConnectionStatus,
} = healthSlice.actions;

export default healthSlice.reducer;
