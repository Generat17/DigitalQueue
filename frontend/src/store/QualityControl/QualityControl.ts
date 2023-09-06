import {
  EmployeeStatusApi,
  EmployeeStatusModel,
  normalizeEmployeeStatus,
} from "@models/employeeModel";
import {
  normalizeQueue,
  QueueApi,
  QueueModel,
} from "@models/qualityControlModel";
import { HTTPMethod } from "@shared//store/ApiStore/types";
import ApiStore from "@shared/store/ApiStore";
import { IQualityControlStore } from "@store/QualityControl/types";
import { BASE_URL } from "@utils/baseURL";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_employee" | "_meta" | "_queue";

export default class QualityControlStore
  implements ILocalStore, IQualityControlStore
{
  private readonly apiStore = new ApiStore(BASE_URL);

  private _employee: EmployeeStatusApi = { employee_id: -1, status: -1 };
  private _queue: QueueApi = {
    id_client: -1,
    workstation_number: -1,
    status: -1,
    quality: 0,
  };
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<QualityControlStore, PrivateFields>(this, {
      _employee: observable,
      _queue: observable,
      _meta: observable,
      employee: computed,
      queue: computed,
      meta: computed,
      getEmployeeStatusList: action,
      getQueueStatus: action,
      updateQuality: action,
    });
  }

  get employee(): EmployeeStatusModel {
    return normalizeEmployeeStatus(this._employee);
  }

  get queue(): QueueModel {
    return normalizeQueue(this._queue);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getEmployeeStatusList(workstation: string): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<EmployeeStatusApi>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/api/employee/status/${workstation}`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        this._employee = response.data;
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
      }
    });
  }
  async getQueueStatus(workstation: string): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<QueueApi>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/api/queue/status/${workstation}`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        this._queue = response.data;
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
      }
    });
  }
  async updateQuality(client: number, quality: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<boolean>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/api/queue/quality/${client}/${quality}`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
      }
    });
  }

  destroy(): void {
    // nothing to do
  }
}
