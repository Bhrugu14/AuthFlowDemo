import {put} from 'redux-saga/effects';
import {Alert} from 'react-native';
import * as loginActions from '../../store/actions/loginActions';
import {store} from '..';

const checkUser = () => {
  let loginCredentials = store.getState().loginReducer;
  let usersData = store.getState().registerReducer.user;
  let userExist = usersData.find(
    (item: {email: string; phone: string; password: string}) =>
      (item.email.toLowerCase() === loginCredentials.username.toLowerCase() ||
        item.phone === loginCredentials.username) &&
      item.password === loginCredentials.password,
  );
  // console.log('userExist', userExist);
  if (userExist) {
    return {
      success: true,
      data: {id: Math.random()},
      message: 'Success',
    };
  } else {
    return {
      success: false,
      data: {id: Math.random()},
      message: 'User Credentials not found',
    };
  }
};

export default function* loginAsync() {
  yield put(loginActions.enableLoader());

  const response = checkUser();

  if (response.success) {
    yield put(loginActions.onLoginResponse(response.data));
    yield put(loginActions.disableLoader());
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader());
    setTimeout(() => {
      Alert.alert('Login Failed', response.message);
    }, 200);
  }
}
