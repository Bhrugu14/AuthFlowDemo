// types.ts

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserState {
  user: User[];
  loading: boolean;
  error: string | null;
}

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

interface RegisterUserAction {
  type: typeof REGISTER_USER;
  payload: User;
}

interface RegisterUserSuccessAction {
  type: typeof REGISTER_USER_SUCCESS;
  payload: User;
}

interface RegisterUserFailureAction {
  type: typeof REGISTER_USER_FAILURE;
  payload: string;
}

export type UserActionTypes =
  | RegisterUserAction
  | RegisterUserSuccessAction
  | RegisterUserFailureAction;
