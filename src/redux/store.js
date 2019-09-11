
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import rpm from 'redux-promise-middleware'
import { createLogger } from 'redux-logger';

const initState = {};

const logger = createLogger();

const middleware = [thunk, rpm, logger];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	initState,
	composeEnhancers(applyMiddleware(...middleware))
)


export default store;