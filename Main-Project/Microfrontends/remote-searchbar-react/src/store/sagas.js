import { all } from 'redux-saga/effects';
import searchSaga from '../components/Search/store/saga';

export default function* rootSaga() {
    yield all([
        ...searchSaga
    ]);
}