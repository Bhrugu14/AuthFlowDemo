import {
  User,
  UserActionTypes,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../../models/actions/register';

export const registerUser = (
  name: string,
  surname: string,
  email: string,
  password: string,
  phone: string,
): UserActionTypes => ({
  type: REGISTER_USER,
  payload: {name, surname, email, password, phone},
});

export const registerUserSuccess = (user: User): UserActionTypes => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const registerUserFailure = (error: string): UserActionTypes => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});
