import {
  normalizeWorkstation,
  WorkstationApi,
  WorkstationModel,
} from "@models/workstationModel";
import { HTTPMethod } from "@shared//store/ApiStore/types";
import ApiStore from "@shared/store/ApiStore";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@shared/store/models/collection";
import { IWorkstationStore } from "@store/WorkstationStore/types";
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

export default class WorkstationStore
  implements ILocalStore, IWorkstationStore
{
  private readonly apiStore = new ApiStore(BASE_URL);

  private _list: CollectionModel<number, WorkstationModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<WorkstationStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getWorkstationList: action,
    });
  }

  get list(): WorkstationModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getWorkstationList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this.apiStore.request<WorkstationApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/api/workstation`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: WorkstationModel[] = [];

        for (const item of response.data.data) {
          list.push(normalizeWorkstation(item));
        }

        this._meta = Meta.success;

        this._list = normalizeCollection(
          list,
          (listItem) => listItem.workstationId
        );
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  async removeWorkstation(workstationId: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: { workstationId: `${workstationId.toString()}` },
      headers: {},
      endpoint: `/auth/workstation/remove`,
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

  async addWorkstation(workstationName: string): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: { workstationName: `${workstationName}` },
      headers: {},
      endpoint: `/auth/workstation/add`,
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

  async updateWorkstation(
    workstationId: number,
    workstationName: string
  ): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: {
        workstationId: `${workstationId.toString()}`,
        workstationName: `${workstationName}`,
      },
      headers: {},
      endpoint: `/auth/workstation/update`,
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

  async updateWorkstationResponsibility(
    workstationId: number,
    responsibilityIdList: number[]
  ): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<WorkstationApi[]>({
      method: HTTPMethod.POST,
      data: {
        workstationId: `${workstationId.toString()}`,
        responsibilityIdList: responsibilityIdList,
      },
      headers: {},
      endpoint: `/auth/workstationResponsibility/update`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        this._meta = Meta.success;
        const list: WorkstationModel[] = [];

        for (const item of response.data.data) {
          list.push(normalizeWorkstation(item));
        }

        this._list = normalizeCollection(
          list,
          (listItem) => listItem.workstationId
        );

        return;
      } catch (e) {
        this._meta = Meta.error;
      }
    });
  }

  async removeWorkstationResponsibility(
    workstationId: string,
    responsibilityId: string
  ): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: {
        workstationId: `${workstationId.toString()}`,
        responsibilityId: `${responsibilityId.toString()}`,
      },
      headers: {},
      endpoint: `/auth/workstationResponsibility/remove`,
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
