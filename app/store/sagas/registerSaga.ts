import {put} from 'redux-saga/effects';
import {
  registerUserSuccess,
  registerUserFailure,
} from '../actions/registerAction';
import {UserActionTypes} from '../../models/actions/register';

export default function* registerUserSaga(action: UserActionTypes) {
  try {
    const user = action.payload;
    yield put(registerUserSuccess(user));
  } catch (error) {
    yield put(registerUserFailure(error.message));
  }
}
