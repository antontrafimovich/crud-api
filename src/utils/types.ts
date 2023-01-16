export const isString = (v: unknown): v is string => {
  return typeof v === "string";
};

export const isNumber = (v: unknown): v is number => {
  return typeof v === "number";
};

export const isArray = <T = unknown>(v: unknown): v is T[] => {
  return Array.isArray(v);
};

export const isObject = (v: unknown): v is Record<string, unknown> => {
  return typeof v === "object" && !isArray(v);
};
