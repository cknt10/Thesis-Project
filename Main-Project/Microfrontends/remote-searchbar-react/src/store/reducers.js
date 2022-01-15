import { combineReducers } from 'redux';
import searchReducer from '../components/Search/store/reducer';
import experimentsReducer from '../services/experiments/store/reducer';

const createRootReducer = () => combineReducers({
    search: searchReducer,
    experiments: experimentsReducer,
});

export default createRootReducer;