import { call, put, takeLatest, select } from 'redux-saga/effects';
import { authApi } from '../../Api';
import { actionsCreator } from '../actions/actionsCreator';
import { LOGOUT_USER, FETCH_USER_DETAILS, FETCH_TENANT_DETAILS } from '../actions/actionTypes';
import get from 'lodash/get';
import { toast } from 'react-toastify';

function* logoutUser(action) {
    try {
        yield put(actionsCreator.SET_LOGIN({ isLoggedIn: false, userDetails: {} }));
        localStorage.removeItem('auth_token');
    } catch (error) {
        console.log("error while logging out user", error.message);
    }
}
function* fetchUserDetails(action) {
    try {
        const response = yield call(authApi.fetchUserDetails);
        const data =response.data;
        yield put(actionsCreator.SET_USER_DETAILS(data));
    } catch (error) {
        yield put(actionsCreator.SET_USER_DETAILS({}));
    }
}


export default function* userSagas() {
    yield takeLatest(LOGOUT_USER, logoutUser);
    yield takeLatest(FETCH_USER_DETAILS, fetchUserDetails);
}