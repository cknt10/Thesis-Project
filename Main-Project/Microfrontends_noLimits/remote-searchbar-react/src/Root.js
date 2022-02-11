import React from 'react';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store/';

const store = configureStore();

// TODO remove any type
// export default (props: any) => {
export default (props) => {
    return(
        <Provider store={store}>
            { props.children }
        </Provider>
    );
};