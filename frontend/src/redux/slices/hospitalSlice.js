import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../services/axios";

// ======================================
// SAVE PROFILE
// ======================================

export const saveHospitalProfile = createAsyncThunk(
  "hospital/saveProfile",

  async (profileData, thunkAPI) => {
    try {
      const { data } = await API.post(
        "/hospital/profile",

        profileData,
      );

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile save failed",
      );
    }
  },
);

// ======================================
// FETCH PATIENTS
// ======================================

export const fetchHospitalPatients = createAsyncThunk(
  "hospital/fetchPatients",

  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/hospital/patients");

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch patients",
      );
    }
  },
);

// ======================================
// FETCH REALTIME DATA
// ======================================

export const fetchRealtimePatientData = createAsyncThunk(
  "hospital/fetchRealtime",

  async (patientId, thunkAPI) => {
    try {
      const { data } = await API.get(`/hospital/realtime/${patientId}`);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch realtime data",
      );
    }
  },
);

// ======================================
// FETCH REPORTS
// ======================================

export const fetchPatientReports = createAsyncThunk(
  "hospital/fetchReports",

  async (patientId, thunkAPI) => {
    try {
      const { data } = await API.get(`/hospital/reports/${patientId}`);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch reports",
      );
    }
  },
);

// ======================================
// INITIAL STATE
// ======================================

const initialState = {
  profile: null,

  patients: [],

  selectedPatient: null,

  realtimeData: [],

  reports: [],

  loading: false,

  error: null,
};

// ======================================
// SLICE
// ======================================

const hospitalSlice = createSlice({
  name: "hospital",

  initialState,

  reducers: {
    // ================================
    // SELECT PATIENT
    // ================================

    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==============================
      // SAVE PROFILE
      // ==============================

      .addCase(saveHospitalProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(saveHospitalProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = action.payload;
      })

      .addCase(saveHospitalProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ==============================
      // FETCH PATIENTS
      // ==============================

      .addCase(fetchHospitalPatients.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchHospitalPatients.fulfilled, (state, action) => {
        state.loading = false;

        state.patients = action.payload;
      })

      .addCase(fetchHospitalPatients.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ==============================
      // FETCH REALTIME
      // ==============================

      .addCase(fetchRealtimePatientData.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRealtimePatientData.fulfilled, (state, action) => {
        state.loading = false;

        state.realtimeData = action.payload;
      })

      .addCase(fetchRealtimePatientData.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ==============================
      // FETCH REPORTS
      // ==============================

      .addCase(fetchPatientReports.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPatientReports.fulfilled, (state, action) => {
        state.loading = false;

        state.reports = action.payload;
      })

      .addCase(fetchPatientReports.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

// ======================================

export const { setSelectedPatient } = hospitalSlice.actions;

// ======================================

export default hospitalSlice.reducer;
