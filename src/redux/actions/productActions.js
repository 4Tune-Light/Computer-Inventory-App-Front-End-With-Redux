import axios from 'axios';

export const getProducts = query => {
	const { search, sortBy, sort, limit, page } = query;
	console.log(page)
	return {
		type: 'GET_PRODUCTS',
		payload: axios.get(`/api/products?sortBy=${sortBy}&sort=${sort}&page=${page}&limit=${limit}&search=${search}`)
	}
}

export const getProduct = id => {
	return {
		type: 'GET_PRODUCT',
		payload: axios.get('/api/products/' + id)
	}
}

export const createProduct = (data, user) => {
	return {
		type: 'CREATE_PRODUCT',
		payload: axios.post('/api/products', data, {headers: {auth: user.token, username: user.username, email: user.email}})
	}
}

export const updateProduct = (id, data, user) => {
	return {
		type: 'UPDATE_PRODUCT',
		payload: axios.put('/api/products/' + id, data, {headers: {auth: user.token, username: user.username, email: user.email}})
	}
}

export const addOrReduce = (id, action, user) => {
	const act = {action};
	return {
		type: 'ADD_OR_REDUCE',
		payload: axios.patch('/api/products/' + id, act, {headers: {auth: user.token, username: user.username, email: user.email}})
	}
}

export const deleteProduct = (id, user) => {
	return {
		type: 'DELETE_PRODUCT',
		payload: axios.delete('/api/products/' + id, {headers: {auth: user.token, username: user.username, email: user.email}})
	}
}

export const sendQuery = data => {
	return {
		type: 'SEND_QUERY',
		payload: data
	}
}