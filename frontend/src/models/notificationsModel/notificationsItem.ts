export type TimingApi = {
  id: number;
  name: string;
  seconds: number;
  active: boolean;
};

export type TimingModel = {
  id: number;
  name: string;
  seconds: number;
  active: boolean;
};

export const normalizeTiming = (from: TimingApi): TimingModel => ({
  id: from.id,
  name: from.name,
  seconds: from.seconds,
  active: from.active,
});

export type EmailApi = {
  id: number;
  timing: number;
  email: string;
};

export type EmailModel = {
  id: number;
  timing: number;
  email: string;
};

export const normalizeEmail = (from: EmailApi): EmailModel => ({
  id: from.id,
  timing: from.timing,
  email: from.email,
});
