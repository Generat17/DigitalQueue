import { BASE_URL } from "@utils/baseURL";
import axios from "axios";

import { AuthResponse } from "../models/response/AuthResponse";

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers !== undefined) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${BASE_URL}/auth/refresh/`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("Пользователь не авторизован");
      }
    }
    throw error;
  }
);

export default $api;
