export type LogItemApi = {
  id: number;
  ticket_number: number;
  priority: number;
  service_type: string;
  workstation_number: number;
  status: number;
  start_time: number;
  call_time: number;
  service_time: number;
  end_time: number;
  quality: number;
  employee_id: number;
  employee_first_name: string;
  employee_second_name: string;
  workstation_name: string;
};

export type LogItemModel = {
  id: number;
  ticketNumber: number;
  priority: number;
  serviceType: string;
  workstationNumber: number;
  status: number;
  startTime: number;
  callTime: number;
  serviceTime: number;
  endTime: number;
  quality: number;
  employeeId: number;
  employeeFirstName: string;
  employeeSecondName: string;
  workstationName: string;
};

export const normalizeLogItem = (from: LogItemApi): LogItemModel => ({
  id: from.id,
  ticketNumber: from.ticket_number,
  priority: from.priority,
  serviceType: from.service_type,
  workstationNumber: from.workstation_number,
  status: from.status,
  startTime: from.start_time,
  callTime: from.call_time,
  serviceTime: from.service_time,
  endTime: from.end_time,
  quality: from.quality,
  employeeId: from.employee_id,
  employeeFirstName: from.employee_first_name,
  employeeSecondName: from.employee_second_name,
  workstationName: from.workstation_name,
});

export type QueueAdminItemApi = {
  id_client: number;
  priority: number;
  service_type: string;
  workstation_number: number;
  status: number;
  start_time: number;
  call_time: number;
  service_time: number;
};

export type QueueAdminItemModel = {
  Id: number;
  Priority: number;
  ServiceType: string;
  WorkstationNumber: number;
  Status: number;
  StartTime: number;
  CallTime: number;
  ServiceTime: number;
};

export const normalizeQueueAdminItem = (
  from: QueueAdminItemApi
): QueueAdminItemModel => ({
  Id: from.id_client,
  Priority: from.priority,
  ServiceType: from.service_type,
  WorkstationNumber: from.workstation_number,
  Status: from.status,
  StartTime: from.start_time,
  CallTime: from.call_time,
  ServiceTime: from.service_time,
});
