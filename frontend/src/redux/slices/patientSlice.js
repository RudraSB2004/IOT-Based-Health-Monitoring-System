import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// Async thunk to create/update profile
export const savePatientProfile = createAsyncThunk(
  "patient/saveProfile",
  async (profileData, thunkAPI) => {
    try {
      const { data } = await API.post("/patient/profile", profileData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePatientProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(savePatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientSlice.reducer;
