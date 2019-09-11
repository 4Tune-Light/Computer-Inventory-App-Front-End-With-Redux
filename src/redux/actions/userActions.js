import axios from 'axios';

export const loginUser = user => {
	return {
		type: 'LOGIN_USER',
		payload: axios.post('/api/login', user)
	}
}

export const registerUser = user => {
	return {
		type: 'REGISTER_USER',
		payload: axios.post('/api/register', user)
	}
}