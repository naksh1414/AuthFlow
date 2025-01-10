// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to handle auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authApi = {
  register: async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    if (response.data.data?.token) {
      localStorage.setItem("token", response.data.data?.token);
    }
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    if (response.data.data?.token) {
      localStorage.setItem("token", response.data.data.token);
    }
    console.log("res45", response.data.data.token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  verifyToken: async () => {
    try {
      const response = await api.get("/auth/verify");
      console.log("res", response.data);
      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
