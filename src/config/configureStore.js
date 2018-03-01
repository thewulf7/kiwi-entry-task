/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

let middleware = [ReduxThunk];

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
    middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
    middleware = [...middleware];
}

export default function configureStore(initialState) {
    return createStore(reducers, initialState, applyMiddleware(...middleware));
}
