import axios from "axios";

// ======================================
// BASE URL
// ======================================

const baseURL = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";

// ======================================
// AXIOS INSTANCE
// ======================================

const API = axios.create({
  baseURL,
});

// ======================================
// REQUEST INTERCEPTOR
// ======================================

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default API;
