// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { getLoggedInUser } from '../../helpers/authUtils';
import { API_URL } from '../../helpers/constants';
import axios from 'axios';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, REFRESH_AUTH } from './constants';


import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    refreshAuthSuccess,
    refreshAuthFailed,
} from './actions';

/**
 * Sets the session
 * @param {*} user
 */
const setSession = user => {
    let cookies = new Cookies();
    if (user) {
        cookies.set('user', JSON.stringify(user), { path: '/' })
        cookies.set('csrftoken', user.token.access, { path: '/'})
    }
    else cookies.remove('user', { path: '/' });
};
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { email, password } }) {
    try {
        const { data } = yield call(axios.post, `${API_URL}/jwtauth/token/`, { email, password })
        setSession(data)
        yield put(loginUserSuccess(data));
    } catch (error) {
        yield put(loginUserFailed(error));
        setSession(null);
    }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield call(() => {
            history.push('/account/login');
        });
    } catch (error) {}
}

/**
 * Register the user
 */
function* register({ payload }) {
    try {
        yield call(axios.post,`${API_URL}/register/`, payload, { headers: {'content-type': 'multipart/form-data'} } );
        yield put(registerUserSuccess());
    } catch (error) {
        let message;
        console.error(error);
        console.log(error.response)
        if(error.response!==undefined){
            let response = error.response
            switch (response.status) {
                case 500:
                    message = 'Internal Server Error';
                    break;
                case 400:
                case 401:
                    message = 'Invalid credentials';
                    break;
                default:
                    message = response;
            }
        }else{
            message = 'error'
        }
        yield put(registerUserFailed(message));
    }
}

function* refresh({ payload }){
    const user = getLoggedInUser();
    try{
        const resp = yield call(axios, `${API_URL}/jwtauth/refresh/`, user.token);
        user.token = resp.data;
        setSession(user);
        yield put(refreshAuthSuccess())
    }catch(err){
        setSession(null);
        yield put(refreshAuthFailed('Войдите снова'))
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchRefreshAuth() {
    yield takeEvery(REFRESH_AUTH, refresh);
}

function* authSaga() {
    yield all([
      fork(watchLoginUser), 
      fork(watchLogoutUser), 
      fork(watchRegisterUser)
    ]);
}

export default authSaga;
