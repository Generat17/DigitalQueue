import {
  LogItemApi,
  LogItemModel,
  normalizeQueueAdminItem,
  normalizeLogItem,
  QueueAdminItemApi,
  QueueAdminItemModel,
} from "@models/analyticsModel/analyticsModel";
import { HTTPMethod } from "@shared//store/ApiStore/types";
import ApiStore from "@shared/store/ApiStore";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@shared/store/models/collection";
import { IAnalyticsStore } from "@store/AnalyticsStore/types";
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

type PrivateFields =
  | "_list"
  | "_meta"
  | "_queue"
  | "_filterListEmployee"
  | "_totalCoupon"
  | "_totalQuality"
  | "_totalTime"
  | "_filterList"
  | "_totalCouponEmployee"
  | "_totalQualityEmployee"
  | "_totalTimeEmployee"
  | "_totalCouponTime"
  | "_totalQualityTime"
  | "_totalTimeTime";

export default class AnalyticsStore implements ILocalStore, IAnalyticsStore {
  private readonly apiStore = new ApiStore(BASE_URL);

  private _list: CollectionModel<number, LogItemModel> =
    getInitialCollectionModel();
  private _queue: CollectionModel<number, QueueAdminItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _filterListEmployee: any;
  private _filterListTime: any;
  private _filterList: any;
  private _totalCoupon: number = 0;
  private _totalQuality: number = 0;
  private _totalTime: number = 0;
  private _totalCouponEmployee: number = 0;
  private _totalQualityEmployee: number = 0;
  private _totalTimeEmployee: number = 0;
  private _totalCouponTime: number = 0;
  private _totalQualityTime: number = 0;
  private _totalTimeTime: number = 0;

  constructor() {
    makeObservable<AnalyticsStore, PrivateFields>(this, {
      _list: observable.ref,
      _queue: observable.ref,
      _filterListEmployee: observable.ref,
      _filterList: observable.ref,
      _meta: observable,
      _totalCoupon: observable,
      _totalQuality: observable,
      _totalTime: observable,

      _totalCouponEmployee: observable,
      _totalQualityEmployee: observable,
      _totalTimeEmployee: observable,

      _totalCouponTime: observable,
      _totalQualityTime: observable,
      _totalTimeTime: observable,

      list: computed,
      filterListEmployee: computed,
      filterListTime: computed,
      filterList: computed,

      totalCouponEmployee: computed,
      totalQualityEmployee: computed,
      totalTimeEmployee: computed,

      totalCouponTime: computed,
      totalQualityTime: computed,
      totalTimeTime: computed,

      totalCoupon: computed,
      totalQuality: computed,
      totalTime: computed,
      queue: computed,
      meta: computed,

      getLogs: action,
      getFilterListEmployee: action,
      getFilterListTime: action,
      getFilterList: action,
      getQueueAdmin: action,
    });
  }

  get list(): LogItemModel[] {
    return linearizeCollection(this._list);
  }

  get filterListEmployee(): LogItemModel[] {
    return this._filterListEmployee;
  }

  get filterListTime(): LogItemModel[] {
    return this._filterListTime;
  }

  get filterList(): LogItemModel[] {
    return this._filterList;
  }

  get totalCoupon(): number {
    return this._totalCoupon;
  }
  get totalQuality(): number {
    return this._totalQuality;
  }
  get totalTime(): any {
    return this._totalTime;
  }

  get totalCouponEmployee(): number {
    return this._totalCouponEmployee;
  }
  get totalQualityEmployee(): number {
    return this._totalQualityEmployee;
  }
  get totalTimeEmployee(): any {
    return this._totalTimeEmployee;
  }

  get totalCouponTime(): number {
    return this._totalCouponTime;
  }
  get totalQualityTime(): number {
    return this._totalQualityTime;
  }
  get totalTimeTime(): any {
    return this._totalTimeTime;
  }

  async getFilterListEmployee(
    dateFrom: string,
    dateTo: string,
    employeeId: number
  ): Promise<void> {
    this._totalCouponEmployee = 0;
    this._totalQualityEmployee = 0;
    this._totalTimeEmployee = 0;
    this._filterListEmployee = linearizeCollection(this._list).filter((it) => {
      const dateFromFormat = new Date(dateFrom);
      dateFromFormat.setHours(0);
      const dateToFormat = new Date(dateTo);
      dateToFormat.setHours(23);
      dateToFormat.setMinutes(59);
      const startTime = new Date(it.startTime * 1000);

      if (
        it.employeeId === employeeId &&
        dateFromFormat <= startTime &&
        startTime <= dateToFormat
      ) {
        this._totalCouponEmployee += 1;
        this._totalTimeEmployee += it.endTime - it.serviceTime;
        if (it.quality === 1) this._totalQualityEmployee += 1;
        return it;
      }
    });
  }

  async getFilterListTime(
    dateFrom: string,
    dateTo: string,
    time: number
  ): Promise<void> {
    this._totalCouponTime = 0;
    this._totalQualityTime = 0;
    this._totalTimeTime = 0;
    this._filterListTime = linearizeCollection(this._list).filter((it) => {
      const dateFromFormat = new Date(dateFrom);
      dateFromFormat.setHours(0);
      const dateToFormat = new Date(dateTo);
      dateToFormat.setHours(23);
      dateToFormat.setMinutes(59);
      const startTime = new Date(it.startTime * 1000);

      if (
        dateFromFormat <= startTime &&
        startTime <= dateToFormat &&
        it.callTime - it.startTime >= time
      ) {
        this._totalCouponTime += 1;
        this._totalTimeTime += it.endTime - it.serviceTime;
        if (it.quality === 1) this._totalQualityTime += 1;
        return it;
      }
    });
  }

  async getFilterList(dateFrom: string, dateTo: string): Promise<void> {
    this._totalCoupon = 0;
    this._totalQuality = 0;
    this._totalTime = 0;
    // eslint-disable-next-line no-console
    console.log(this._list);
    this._filterList = linearizeCollection(this._list).filter((it) => {
      const dateFromFormat = new Date(dateFrom);
      dateFromFormat.setHours(0);
      const dateToFormat = new Date(dateTo);
      dateToFormat.setHours(23);
      dateToFormat.setMinutes(59);
      const startTime = new Date(it.startTime * 1000);

      if (dateFromFormat <= startTime && startTime <= dateToFormat) {
        this._totalCoupon += 1;
        this._totalTime += it.endTime - it.serviceTime;
        if (it.quality === 1) this._totalQuality += 1;
        return it;
      }
    });
  }

  get queue(): QueueAdminItemModel[] {
    return linearizeCollection(this._queue);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getLogs(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this.apiStore.request<LogItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/auth/log`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: LogItemModel[] = [];
        for (const item of response.data) {
          list.push(normalizeLogItem(item));
        }

        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  async getQueueAdmin(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this.apiStore.request<QueueAdminItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/auth/queue`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const queue: QueueAdminItemModel[] = [];
        for (const item of response.data) {
          queue.push(normalizeQueueAdminItem(item));
        }

        this._meta = Meta.success;
        this._queue = normalizeCollection(queue, (listItem) => listItem.Id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._queue = getInitialCollectionModel();
      }
    });
  }
  destroy(): void {
    // nothing to do
  }
}
