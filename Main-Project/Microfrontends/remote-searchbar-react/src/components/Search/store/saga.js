import { put, takeLatest, fork, call } from 'redux-saga/effects';
// import { SearchConstants } from './constants';

function* search() {

    try {

        const response = yield call(() => { 
            return fetch('http://localhost:8087/searchresult')
            .then(response => response.json()) 
        });
        let a= response.map(entry =>{
            return entry.product;
        });
        
        yield put({type: "@search/SEARCH_SUCCESS", results: a});
        
    } catch(error) {
        if(error instanceof Error) {
            yield put({type: "@search/SEARCH_ERROR", error: error.message});
        }
    }
}

function* searchRequest() {
    yield takeLatest("@search/SEARCH", search);
}

export default [
    fork(searchRequest)
];