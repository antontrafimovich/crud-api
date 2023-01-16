export interface User extends Record<string, unknown> {
  name: string;
  age: number;
  hobbies: string[];
}
