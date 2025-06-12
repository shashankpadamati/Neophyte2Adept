import { all } from 'redux-saga/effects';
import userSagas from './authSaga'

export default function* rootSaga() {
    yield all([userSagas()]);
  }