import { IClient } from "@models/IClient";
import { IEmployee } from "@models/IEmployee";
import { IWorkstation } from "@models/IWorkstation";
import AuthService from "@services/AuthService";
import ApiStore from "@shared/store/ApiStore";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { BASE_URL } from "@utils/baseURL";
import { Meta } from "@utils/meta";
import { makeAutoObservable, runInAction } from "mobx";

export default class AuthStore {
  private _meta: Meta = Meta.initial;
  user = {} as IEmployee;
  workstation = {} as IWorkstation;
  client = {} as IClient;
  isAuth = false;
  isLoading = false;
  private readonly apiStore = new ApiStore(BASE_URL);

  constructor() {
    makeAutoObservable(this);
  }

  get meta(): Meta {
    return this._meta;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IEmployee) {
    this.user = user;
  }

  setStatusEmployee(status: number) {
    this.user.status = status;
  }

  setClient(client: IClient) {
    this.client = client;
  }

  setWorkstation(workstation: IWorkstation) {
    this.workstation = workstation;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(username: string, password: string, workstationId: string) {
    try {
      const response = await AuthService.login(
        username,
        password,
        workstationId
      );

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem(
        "employeeId",
        String(response.data.employee.employee_id)
      );
      localStorage.setItem("workstationId", workstationId);

      this.setAuth(true);
      this.setUser(response.data.employee);
      this.setStatusEmployee(1);
      this.setWorkstation(response.data.workstation);
      this._meta = Meta.success;
    } catch (e) {
      this._meta = Meta.error;
      // eslint-disable-next-line no-console
      console.log("error login");
    }
  }

  async registration(username: string, password: string) {
    try {
      const response = await AuthService.registration(username, password);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.employee);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error registration");
    }
  }

  async logout() {
    try {
      await AuthService.logout(
        String(this.user.employee_id),
        String(this.workstation.workstation_id)
      );

      // eslint-disable-next-line no-console
      console.log(String(this.workstation.workstation_id));

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("employeeId");
      localStorage.removeItem("workstationId");
      this.setAuth(false);
      this.setUser({} as IEmployee);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error logout");
    }
  }

  async checkAuth(workstationId: string, employeeId: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.refresh(
        workstationId,
        employeeId,
        localStorage.getItem("refreshToken")!
      );

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem(
        "employeeId",
        String(response.data.employee.employee_id)
      );
      localStorage.setItem("workstationId", workstationId);
      this.setAuth(true);
      this.setUser(response.data.employee);
      this.setWorkstation(response.data.workstation);
    } catch (e) {
    } finally {
      this.setLoading(false);
    }
  }

  async getClient(): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<IClient>({
      method: HTTPMethod.POST,
      data: {},
      headers: {},
      endpoint: `/auth/employee/client`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this.setClient({
          number_ticket: response.data.number_ticket,
          service_ticket: response.data.service_ticket,
          number_queue: response.data.number_queue,
        });
        this.setStatusEmployee(response.data.employee_status);
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error getClient");
      }
    });
  }

  async confirmClient(numberQueue: number): Promise<void> {
    this._meta = Meta.loading;
    const response = await this.apiStore.request<IClient>({
      method: HTTPMethod.POST,
      data: { numberQueue: `${numberQueue}` },
      headers: {},
      endpoint: `/auth/employee/confirmClient`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error confirmClient");
      }
      try {
        this.setStatusEmployee(response.data.number_queue);
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error confirmClient");
      }
    });
  }

  async endClient(numberQueue: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<IClient>({
      method: HTTPMethod.POST,
      data: { numberQueue: `${numberQueue}` },
      headers: {},
      endpoint: `/auth/employee/endClient`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error endClient");
      }
      try {
        this.setStatusEmployee(response.data.number_queue);
        this.client.number_ticket = -2;

        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error endClient");
      }
    });
  }

  async notComeClient(numberQueue: number): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<IClient>({
      method: HTTPMethod.POST,
      data: { numberQueue: `${numberQueue}` },
      headers: {},
      endpoint: `/auth/employee/notComeClient`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error endClient");
      }
      try {
        this.setStatusEmployee(response.data.number_queue);
        this.client.number_ticket = -2;

        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error endClient");
      }
    });
  }
}
