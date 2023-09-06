import {
  EmployeeApi,
  EmployeeModel,
  normalizeEmployee,
} from "@models/employeeModel";
import { HTTPMethod } from "@shared//store/ApiStore/types";
import ApiStore from "@shared/store/ApiStore";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@shared/store/models/collection";
import { IEmployeeStore } from "@store/EmployeeStore/types";
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

type PrivateFields = "_list" | "_meta" | "_metaAdd";

export default class EmployeeStore implements ILocalStore, IEmployeeStore {
  private readonly apiStore = new ApiStore(BASE_URL);

  private _list: CollectionModel<number, EmployeeModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _metaAdd: Meta = Meta.initial;

  constructor() {
    makeObservable<EmployeeStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _metaAdd: observable,
      list: computed,
      meta: computed,
      getEmployeeList: action,
    });
  }

  get list(): EmployeeModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }
  get metaAdd(): Meta {
    return this._metaAdd;
  }

  async getEmployeeList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this.apiStore.request<EmployeeApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/api/employee`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: EmployeeModel[] = [];

        for (const item of response.data.data) {
          list.push(normalizeEmployee(item));
        }

        this._meta = Meta.success;

        this._list = normalizeCollection(
          list,
          (listItem) => listItem.employeeId
        );
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  async removeEmployee(employeeId: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: { employeeId: `${employeeId.toString()}` },
      headers: {},
      endpoint: `/auth/employee/remove`,
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

  async addEmployee(
    username: string,
    password: string,
    firstName: string,
    secondName: string,
    isAdmin: boolean
  ): Promise<void> {
    this._metaAdd = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: {
        username: `${username}`,
        password: `${password}`,
        firstName: `${firstName}`,
        secondName: `${secondName}`,
        isAdmin: `${isAdmin}`,
      },
      headers: {},
      endpoint: `/auth/sign-up`,
    });

    runInAction(() => {
      if (!response.success) {
        this._metaAdd = Meta.error;
      } else {
        this._metaAdd = Meta.success;
      }
    });
  }

  async updateEmployee(
    employeeId: number,
    username: string,
    firstName: string,
    secondName: string,
    isAdmin: boolean
  ): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<string>({
      method: HTTPMethod.POST,
      data: {
        employeeId: `${employeeId.toString()}`,
        username: `${username}`,
        firstName: `${firstName}`,
        secondName: `${secondName}`,
        isAdmin: `${isAdmin}`,
      },
      headers: {},
      endpoint: `/auth/employee/update`,
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

  async updateEmployeeResponsibility(
    employeeId: number,
    responsibilityIdList: number[]
  ): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<EmployeeApi[]>({
      method: HTTPMethod.POST,
      data: {
        employeeId: `${employeeId.toString()}`,
        responsibilityIdList: responsibilityIdList,
      },
      headers: {},
      endpoint: `/auth/employeeResponsibility/update`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        this._meta = Meta.success;
        const list: EmployeeModel[] = [];

        for (const item of response.data.data) {
          list.push(normalizeEmployee(item));
        }

        this._list = normalizeCollection(
          list,
          (listItem) => listItem.employeeId
        );

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
