export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface NewUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}
