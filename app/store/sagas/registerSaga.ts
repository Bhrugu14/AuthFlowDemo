import {put} from 'redux-saga/effects';
import {
  registerUserSuccess,
  registerUserFailure,
} from '../actions/registerAction';
import {UserActionTypes} from '../../models/actions/register';

export default function* registerUserSaga(action: UserActionTypes) {
  console.log('YIELD', action);
  try {
    const user = action.payload;
    console.log('YIELD', user);

    yield put(registerUserSuccess(user));
  } catch (error) {
    yield put(registerUserFailure(error.message));
  }
}
