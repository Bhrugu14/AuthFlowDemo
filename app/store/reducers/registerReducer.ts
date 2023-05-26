// userReducer.ts
import createReducer from '../../lib/createReducer';
import {
  UserActionTypes,
  UserState,
  REGISTER_USER_SUCCESS,
} from '../../models/actions/register';

const initialState: UserState = {
  user: [],
  loading: false,
  error: null,
};

export const registerReducer = createReducer(initialState, {
  [REGISTER_USER_SUCCESS](state: UserState, action: UserActionTypes) {
    console.log('REGISTER_USER_SUCCESS', action);
    let data = JSON.parse(JSON.stringify(state.user));
    console.log('REGISTER_USER_SUCCESS2', data);
    data.push(action.payload);
    console.log('REGISTER_USER_SUCCESS3', data);
    console.log('+++++++++++');
    console.log('data', data);
    console.log('+++++++++++');

    return {
      ...state,
      user: data,
      loading: false,
      error: null,
    };
  },
});
