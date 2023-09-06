import ApiStore from "@shared/store/ApiStore";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { BASE_URL } from "@utils/baseURL";
import { Meta } from "@utils/meta";
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_ticketNumber" | "_meta";

type Ticket = {
  TicketID: number;
};

export default class WaitStore {
  private _ticketNumber: number = -1;
  private readonly apiStore = new ApiStore(BASE_URL);
  private _meta: Meta = Meta.initial;

  constructor() {
    makeAutoObservable<WaitStore, PrivateFields>(this, {
      _ticketNumber: observable,
      _meta: observable,
      ticketNumber: computed,
      meta: computed,
      getTicket: action,
    });
  }

  get ticketNumber(): number {
    return this._ticketNumber;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getTicket(service: string): Promise<void> {
    const response = await this.apiStore.request<Ticket>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/api/queue/${service}`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this._ticketNumber = response.data.TicketID;
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
      }
    });
  }
}
