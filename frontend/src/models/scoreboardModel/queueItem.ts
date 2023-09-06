export type QueueItemApi = {
  id_client: number;
  service_type: string;
  workstation_number: number;
};

export type QueueItemModel = {
  id: number;
  service: string;
  workstation: number;
};

export const normalizeQueueItem = (from: QueueItemApi): QueueItemModel => ({
  id: from.id_client,
  service: from.service_type,
  workstation: from.workstation_number,
});
