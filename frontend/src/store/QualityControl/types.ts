export interface IQualityControlStore {
  getEmployeeStatusList(workstation: string): Promise<void>;
  getQueueStatus(workstation: string): Promise<void>;
}
