const initState = {
	products: [],
	total: 0,
	errMessage:'',
  message:'',
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  isRedirected: false
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'GET_PRODUCTS_PENDING':
		case 'GET_PRODUCT_PENDING':
		case 'CREATE_PRODUCT_PENDING':
		case 'UPDATE_PRODUCT_PENDING':
		case 'DELETE_PRODUCT_PENDING':
			return {
				...state,
				total: 0,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,
				isRedirected: false
			}
		case 'GET_PRODUCTS_REJECT':
		case 'GET_PRODUCT_REJECT':
		case 'CREATE_PRODUCT_REJECT':
		case 'UPDATE_PRODUCT_REJECT':
		case 'DELETE_PRODUCT_REJECT':
			return {
				...state,
				isLoading: false,
				isRejected: true,
				errMessage: action.payload.data.message
			}
		case 'GET_PRODUCTS_FULFILLED':
			return {
				...state,
				products: action.payload.data.data,
				total: action.payload.data.total[0],
				isLoading: false,
				isFulfilled: true,
			}
		case 'GET_PRODUCT_FULFILLED':
			return {
				...state,
				products: action.payload.data.data[0],
				isLoading: false,
				isFulfilled: true,
			}
		case 'CREATE_PRODUCT_FULFILLED':
			return {
				products: action.payload.data.data,
				...state,
				isLoading: false,
				isFulfilled: true,
				isRedirected: true
			}
		case 'UPDATE_PRODUCT_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				isRedirected: true
			}
		case 'DELETE_PRODUCT_FULFILLED':
			return {
				...state,
				products: state.products.filter(product => product.id != action.payload.data.id),
				isLoading: false,
				isFulfilled: true,
			}
		case 'SEND_QUERY':
			return {
				...state,
				query: action.payload
			}
		default:
			return state;
	}
}