'use client'; 
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_HOME_DATA, fetcHomeDataFailure, fetcHomeDataSuccess } from './action';

function* fetchHomeDataSaga() {
    try {
        const response = yield call(axios.get, 'http://localhost/blog/wp-json/myapi/v1/pages/home');
        yield put(fetcHomeDataSuccess(response.data));
    } catch (error) {
        yield put(fetcHomeDataFailure(error.message));
    }
}

export default function* watchFetchFormData() {
    yield takeLatest(FETCH_HOME_DATA, fetchHomeDataSaga);
}
