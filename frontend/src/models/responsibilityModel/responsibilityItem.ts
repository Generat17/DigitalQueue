export type ResponsibilityApi = {
  responsibility_id: number;
  responsibility_name: string;
  responsibility_priority: number;
};

export type ResponsibilityModel = {
  id: number;
  name: string;
  priority: number;
};

export const normalizeResponsibility = (
  from: ResponsibilityApi
): ResponsibilityModel => ({
  id: from.responsibility_id,
  name: from.responsibility_name,
  priority: from.responsibility_priority,
});
