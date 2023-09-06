export interface INotificationsStore {
  getEmailList(): Promise<void>;
  getTimingList(): Promise<void>;
}
