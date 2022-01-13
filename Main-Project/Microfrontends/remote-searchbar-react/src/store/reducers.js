import { combineReducers } from 'redux';
import searchReducer from '../components/Search/store/reducer';

const createRootReducer = () => combineReducers({
    search: searchReducer
});

// export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;