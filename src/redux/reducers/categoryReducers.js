const initState = {
	categories: [],
	errMessage:'',
  message:'',
  isLoading: false,
  isRejected: false,
  isFulfilled: false
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'GET_CATEGORIES_PENDING':
			return {
				...state,
				isLoading: true,
				isRejected: false,
				isFulfilled: false
			}
		case 'GET_CATEGORIES_REJECT':
			return {
				...state,
				isLoading: false,
				isRejected: true,
				errMessage: action.payload.data.message
			}
		case 'GET_CATEGORIES_FULFILLED':
			return {
				...state,
				categories: action.payload.data.data,
				isLoading: false,
				isFulfilled: true,
			}
		default:
			return state;
	}
}