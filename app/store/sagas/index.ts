/**
 *  Redux saga class init
 */
import {takeEvery, all} from 'redux-saga/effects';
import * as types from '../actions/types';
import loginSaga from './loginSaga';
import {REGISTER_USER} from '../../models/actions/register';
import registerUserSaga from './registerSaga';

export default function* watch() {
  yield all([
    takeEvery(types.LOGIN_REQUEST, loginSaga),
    takeEvery(REGISTER_USER, registerUserSaga),
  ]);
}
// export default function* watch() {
//   yield all([takeEvery(REGISTER_USER, registerUserSaga)]);
// }
