import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { DEBUG_MODE } from '../services/config';
import createRootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore() {

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        createRootReducer(),
        composeWithDevTools(
            applyMiddleware(
                sagaMiddleware,
                // loggerMiddleware
                createLogger({predicate: () => DEBUG_MODE})
            )
        )
    );
    
    sagaMiddleware.run(rootSaga);
    
    return store;
}