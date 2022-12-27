import { v4 as uuidv4, validate } from "uuid";

export const generateUid = () => {
  return uuidv4();
};

export const isValidUid = (id) => {
  return validate(id);
};
