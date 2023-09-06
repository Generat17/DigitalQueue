export type QueueApi = {
  id_client: number;
  workstation_number: number;
  status: number;
  quality: number;
};

export type QueueModel = {
  id: number;
  workstation: number;
  status: number;
  quality: number;
};

export const normalizeQueue = (from: QueueApi): QueueModel => ({
  id: from.id_client,
  workstation: from.workstation_number,
  status: from.status,
  quality: from.quality,
});
