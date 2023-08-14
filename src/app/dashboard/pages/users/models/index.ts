export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'student',
}

export interface NewUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}
