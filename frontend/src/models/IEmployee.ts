export interface IEmployee {
  employee_id: number;
  username: string;
  password: string;
  first_name: string;
  second_name: string;
  session_state: boolean;
  status: number;
  refresh_token: string;
  expires_at: number;
  workstation_id: number;
  is_admin: number;
}
