import { v4 as uuidv4, validate } from "uuid";

export const generateUid = (): string => {
  return uuidv4();
};

export const isValidUid = (id: string): boolean => {
  return validate(id);
};
