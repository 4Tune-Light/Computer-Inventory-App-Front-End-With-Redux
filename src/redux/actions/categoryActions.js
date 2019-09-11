import axios from 'axios';

export const getCategories = () => {
	return {
		type: 'GET_CATEGORIES',
		payload: axios.get('/api/categories')
	}
}