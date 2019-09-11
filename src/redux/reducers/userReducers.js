const initState = {
	token: '',
	username: '',
	email: '',
	errMessage:'',
  message:'',
  isLogged: false,
  isLoading: false,
  isRejected: false,
  isFulfilled: false
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'LOGIN_USER_PENDING':
		case 'REGISTER_USER_PENDING':
			return {
				...state,
				isLogged: false,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,

			}
		case 'LOGIN_USER_REJECT':
		case 'REGISTER_USER_REJECT':
			return {
				...state,
				isLoading: false,
				isRejected: true,
				errMessage: action.payload.data.message
			}
		case 'LOGIN_USER_FULFILLED':
			return {
				...state,
				token: action.payload.data.token,
				username: action.payload.data.user.username,
				email: action.payload.data.user.email,
				isLogged: true,
				isLoading: false,
				isFulfilled: true,
			}
		case 'REGISTER_USER_FULFILLED':
			return {
				...state,
				token: action.payload.data.token,
				username: action.payload.data.data.username,
				email: action.payload.data.data.email,
				isLogged: true,
				isLoading: false,
				isFulfilled: true,
			}
		default:
			return state;
	}
}