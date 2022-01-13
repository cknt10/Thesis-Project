import produce from 'immer';
// import { SearchActionTypes, MoviePayload } from './types';
// import { SearchConstants } from './constants';

const searchReducer = produce((state = {
    term: '',
    results: []
}, action) => {
    switch(action.type) {
        case "@search/SEARCH":
            state.term = action.term;
            state.error = '';
            return;
        case "@search/SEARCH_SUCCESS":
            state.results = action.results;
            return;
        case "@search/SEARCH_ERROR":
            state.results = [];
            state.error = action.error;
            return;
        default:
            return state;
    }
});

export default searchReducer;