import {
  EmailApi,
  EmailModel,
  normalizeEmail,
  normalizeTiming,
  TimingApi,
  TimingModel,
} from "@models/notificationsModel";
import { HTTPMethod } from "@shared//store/ApiStore/types";
import ApiStore from "@shared/store/ApiStore";
import { INotificationsStore } from "@store/Notifications/types";
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

type PrivateFields = "_listEmail" | "_meta" | "_listTiming";

export default class NotificationsStore
  implements ILocalStore, INotificationsStore
{
  private readonly apiStore = new ApiStore(BASE_URL);

  private _listEmail: EmailModel[] = [];
  private _listTiming: TimingModel[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<NotificationsStore, PrivateFields>(this, {
      _listEmail: observable.ref,
      _listTiming: observable.ref,
      _meta: observable,
      listEmail: computed,
      listTiming: computed,
      meta: computed,
      getEmailList: action,
      getTimingList: action,
    });
  }

  get listEmail(): EmailModel[] {
    return this._listEmail;
  }
  get listTiming(): TimingModel[] {
    return this._listTiming;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getEmailList(): Promise<void> {
    this._meta = Meta.loading;
    this._listEmail = [];

    const response = await this.apiStore.request<EmailApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/auth/email`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: EmailModel[] = [];
        for (const item of response.data) {
          list.push(normalizeEmail(item));
        }

        this._meta = Meta.success;
        this._listEmail = list;
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._listEmail = [];
      }
    });
  }
  async getTimingList(): Promise<void> {
    this._meta = Meta.loading;
    this._listTiming = [];

    const response = await this.apiStore.request<TimingApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/auth/timing`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: TimingModel[] = [];
        for (const item of response.data) {
          list.push(normalizeTiming(item));
        }

        this._meta = Meta.success;
        this._listTiming = list;
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._listTiming = [];
      }
    });
  }

  async removeTiming(id: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: { id: `${id.toString()}` },
      headers: {},
      endpoint: `/auth/timing/remove`,
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

  async addTiming(name: string, seconds: string): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: { name: `${name}`, seconds: `${seconds}` },
      headers: {},
      endpoint: `/auth/timing/add`,
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

  async updateTiming(id: number, name: string, seconds: string): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: {
        id: `${id.toString()}`,
        name: `${name}`,
        seconds: `${seconds}`,
      },
      headers: {},
      endpoint: `/auth/timing/update`,
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

  async removeEmail(id: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: { id: `${id.toString()}` },
      headers: {},
      endpoint: `/auth/email/remove`,
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

  async addEmail(timing: number, email: string): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: { timing: `${timing.toString()}`, email: `${email}` },
      headers: {},
      endpoint: `/auth/email/add`,
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

  async activeTiming(id: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<TimingModel[]>({
      method: HTTPMethod.POST,
      data: {
        id: `${id.toString()}`,
      },
      headers: {},
      endpoint: `/auth/timing/active`,
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
