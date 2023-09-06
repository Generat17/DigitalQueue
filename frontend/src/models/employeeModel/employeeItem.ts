export type EmployeeResponsibilityItem = {
  employee_responsibility_id: number;
  employee_responsibility_name: string;
};

export type EmployeeApi = {
  employee_id: number;
  username: string;
  first_name: string;
  second_name: string;
  session_state: boolean;
  status: number;
  refresh_token: string;
  expires_at: number;
  workstation_id: number;
  is_admin: boolean;
  responsibility_list: EmployeeResponsibilityItem[];
};

export type EmployeeModel = {
  employeeId: number;
  username: string;
  firstName: string;
  secondName: string;
  sessionState: boolean;
  status: number;
  refreshToken: string;
  expiresAt: number;
  workstationId: number;
  isAdmin: boolean;
  responsibilityList: EmployeeResponsibilityItem[];
};

export const normalizeEmployee = (from: EmployeeApi): EmployeeModel => ({
  employeeId: from.employee_id,
  username: from.username,
  firstName: from.first_name,
  secondName: from.second_name,
  sessionState: from.session_state,
  status: from.status,
  refreshToken: from.refresh_token,
  expiresAt: from.expires_at,
  workstationId: from.workstation_id,
  isAdmin: from.is_admin,
  responsibilityList: from.responsibility_list,
});

export type EmployeeStatusApi = {
  employee_id: number;
  status: number;
};

export type EmployeeStatusModel = {
  employeeId: number;
  status: number;
};

export const normalizeEmployeeStatus = (
  from: EmployeeStatusApi
): EmployeeStatusModel => ({
  employeeId: from.employee_id,
  status: from.status,
});
