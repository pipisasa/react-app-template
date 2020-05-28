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

export const loginUser = (email, password) => ({
  type: LOGIN_USER,
  payload: { email, password },
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailed = (error) => ({
  type: LOGIN_USER_FAILED,
  payload: error,
});

export const startRegisterUser = () => ({
  type:START_REGISTER_USER
})

export const registerUser = (formData) => ({
  type: REGISTER_USER,
  payload: formData,
});

export const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS
});

export const registerUserFailed = (error) => ({
  type: REGISTER_USER_FAILED,
  payload: error,
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const refreshAuth = ()=>({
  type: REFRESH_AUTH
})
export const refreshAuthSuccess = ()=>({
  type: REFRESH_AUTH_SUCCESS,
})
export const refreshAuthFailed = (msg)=>({
  type: REFRESH_AUTH_FAILED,
  payload: msg
})