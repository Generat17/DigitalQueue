import { IEmployee } from "@models/IEmployee";
import { IWorkstation } from "@models/IWorkstation";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  employee: IEmployee;
  workstation: IWorkstation;
}
