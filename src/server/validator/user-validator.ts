import { isArray, isNumber, isObject, isString } from "../../utils/types";

export type ValidationResult = boolean | string;

const REQUIRED_FIELDS = ["name", "age", "hobbies"];

export const validate = (value: unknown): ValidationResult => {
  if (!isObject(value)) {
    return "User must be an object type";
  }

  const undefinedRequiredFields = REQUIRED_FIELDS.filter(
    (field) => value[field] === undefined
  );

  if (undefinedRequiredFields.length > 0) {
    return `Value for ${undefinedRequiredFields} field(s) is mandatory.`;
  }

  const { name, age, hobbies } = value;

  const fieldsWithWrongTypes = [];

  if (!isString(name)) {
    fieldsWithWrongTypes.push("name");
  }

  if (!isNumber(age)) {
    fieldsWithWrongTypes.push("age");
  }

  if (!isArray(hobbies)) {
    fieldsWithWrongTypes.push("hobbies");
  }

  if (fieldsWithWrongTypes.length > 0) {
    return `Value for ${fieldsWithWrongTypes.toString()} field(s) has wrong type.`;
  }

  if ((name as string).length <= 1) {
    return `Value for field 'name' should contain > 1 chars.`;
  }

  if ((age as number) < 0) {
    return `Value for field 'age' should be positive.`;
  }

  if ((hobbies as unknown[]).some((value) => !isString(value))) {
    return `Value for 'hobbies' array item must be a string.`;
  }

  return true;
};
