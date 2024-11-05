'use client'
import axios from "axios";
import { getSession } from "next-auth/react";
const api = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL: `${api}`,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const session = await getSession();
      const token = session?.user?.token.access_token;
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
