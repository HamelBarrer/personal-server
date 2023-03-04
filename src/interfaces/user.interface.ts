export interface User {
  userId: number;
  username: string;
  email: string;
  isActive: boolean;
}

export interface UserAccount extends User {
  password: string;
  passwordConfirm?: string;
}
