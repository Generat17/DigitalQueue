import { AxiosResponse } from "axios";

import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  static async login(
    username: string,
    password: string,
    workstationId: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post(`/auth/sign-in/${workstationId}`, { username, password });
  }

  static async refresh(
    workstationId: string,
    employeeId: string,
    refreshToken: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post(`/auth/refresh`, {
      workstationId,
      employeeId,
      refreshToken,
    });
  }

  static async registration(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/auth/sign-up", { username, password });
  }

  static async logout(
    employeeId: string,
    workstationId: string
  ): Promise<void> {
    return $api.post("/auth/logout", { employeeId, workstationId });
  }
}
