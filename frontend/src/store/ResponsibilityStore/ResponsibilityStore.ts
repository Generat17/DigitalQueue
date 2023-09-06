import {
  normalizeResponsibility,
  ResponsibilityApi,
  ResponsibilityModel,
} from "@models/responsibilityModel";
import { HTTPMethod } from "@shared//store/ApiStore/types";
import ApiStore from "@shared/store/ApiStore";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@shared/store/models/collection";
import { IResponsibilityStore } from "@store/ResponsibilityStore/types";
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

type PrivateFields = "_list" | "_meta";

export default class ResponsibilityStore
  implements ILocalStore, IResponsibilityStore
{
  private readonly apiStore = new ApiStore(BASE_URL);

  private _list: CollectionModel<number, ResponsibilityModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ResponsibilityStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getResponsibilityList: action,
    });
  }

  get list(): ResponsibilityModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getResponsibilityList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this.apiStore.request<ResponsibilityApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/api/responsibility`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: ResponsibilityModel[] = [];
        for (const item of response.data) {
          list.push(normalizeResponsibility(item));
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

  async removeResponsibility(responsibilityId: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: { responsibilityId: `${responsibilityId.toString()}` },
      headers: {},
      endpoint: `/auth/responsibility/remove`,
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

  async addResponsibility(responsibilityName: string): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: { responsibilityName: `${responsibilityName}` },
      headers: {},
      endpoint: `/auth/responsibility/add`,
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

  async updateResponsibility(
    responsibilityId: number,
    responsibilityName: string,
    responsibilityPriority: string
  ): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: {
        responsibilityId: `${responsibilityId.toString()}`,
        responsibilityName: `${responsibilityName}`,
        responsibilityPriority: `${responsibilityPriority}`,
      },
      headers: {},
      endpoint: `/auth/responsibility/update`,
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
