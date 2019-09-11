import { combineReducers } from 'redux';

import productReducers from './productReducers';
import categoryReducers from './categoryReducers';
import userReducers from './userReducers';

export default combineReducers({
	product: productReducers,
	category: categoryReducers,
	user: userReducers
});