// @flow
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  START_REGISTER_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REFRESH_AUTH,
  REFRESH_AUTH_SUCCESS,
  REFRESH_AUTH_FAILED,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
  user: getLoggedInUser(),
  loading: false,
};


const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
      case LOGIN_USER:
          return { ...state, loading: true };
      case LOGIN_USER_SUCCESS:
          return { ...state, user: action.payload, loading: false, error: null };
      case LOGIN_USER_FAILED:
          return { ...state, error: action.payload, loading: false };
      case START_REGISTER_USER:
          return { ...state, isRegistered: false}
      case REGISTER_USER:
          return { ...state, loading: true };
      case REGISTER_USER_SUCCESS:
          return { ...state, isRegistered: true, loading: false, error: null };
      case REGISTER_USER_FAILED:
          return { ...state, error: action.payload, loading: false };
      case LOGOUT_USER:
          return { ...state, user: null };
      case REFRESH_AUTH:
          return { ...state };
      case REFRESH_AUTH_SUCCESS:
          return { ...state };
      case REFRESH_AUTH_FAILED:
          return { ...state, error: action.payload };
      default:
          return { ...state };
  }
};

export default Auth;
