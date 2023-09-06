import { IClient } from "@models/IClient";
import {
  normalizeQueueItem,
  QueueItemApi,
  QueueItemModel,
} from "@models/scoreboardModel";
import { HTTPMethod } from "@shared//store/ApiStore/types";
import ApiStore from "@shared/store/ApiStore";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@shared/store/models/collection";
import { IScoreboardStore } from "@store/ScoreboardStore/types";
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

type PrivateFields = "_queue" | "_meta";

export default class ScoreboardStore implements ILocalStore, IScoreboardStore {
  private readonly apiStore = new ApiStore(BASE_URL);

  private _queue: CollectionModel<number, QueueItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ScoreboardStore, PrivateFields>(this, {
      _queue: observable.ref,
      _meta: observable,
      queue: computed,
      meta: computed,
      getScoreboardList: action,
    });
  }

  get queue(): QueueItemModel[] {
    return linearizeCollection(this._queue);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getScoreboardList(): Promise<void> {
    this._meta = Meta.loading;
    this._queue = getInitialCollectionModel();

    const response = await this.apiStore.request<QueueItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/api/queue`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: QueueItemModel[] = [];
        for (const item of response.data) {
          list.push(normalizeQueueItem(item));
        }

        this._meta = Meta.success;
        this._queue = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._queue = getInitialCollectionModel();
      }
    });
  }

  async clearQueue(): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<IClient>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/auth/queue/clear`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error clearQueue");
      }
      try {
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error clearQueue");
      }
    });
  }

  async restartIdentity(): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<IClient>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/auth/queue/restart`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error restartIdentity");
      }
      try {
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error restartIdentity");
      }
    });
  }

  async clearLog(): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<IClient>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/auth/log/clear`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error clearLog");
      }
      try {
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error clearLog");
      }
    });
  }

  destroy(): void {
    // nothing to do
  }
}
