import { UserActionTypes } from './types';
import { UserAction } from './userActions.interface';

const initUserState = {
	email: '',
	name: '',
	isAuth: false,
	token: '',
	errors: [],
};

export function userReducer(state = initUserState, action: UserAction) {
	switch (action.type) {
		case UserActionTypes.GET_USER_SUCCESS:
			return {
				...state,
				email: action.payload.email,
				name: action.payload.name,
				isAuth: true,
				errors: [],
				token: action.payload.token,
			};
		case UserActionTypes.GET_USER_ERROR:
			return { ...state, errors: action.payload, isAuth: false };
		case UserActionTypes.CREATE_USER:
			return {
				...state,
				errors: [],
				isAuth: false,
			};
		case UserActionTypes.CREATE_USER_ERROR:
			return { ...state, errors: action.payload, isAuth: false };
		case UserActionTypes.REMOVE_USER:
			return { ...state, isAuth: false, errors: [] };
		case UserActionTypes.CLEAR_ERRORS:
			return { ...state, errors: [] };
		default:
			return state;
	}
}
