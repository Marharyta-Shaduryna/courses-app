import { userReducer } from '../reducer';
import { UserActionTypes } from '../types';
import { UserAction } from '../userActions.interface';

describe('userReducer', () => {
	test('should return the initial state', () => {
		const initialState = {
			email: '',
			name: '',
			isAuth: false,
			token: '',
			role: '',
			errors: [],
		};
		const action = {} as UserAction;
		const newState = userReducer(initialState, action);
		expect(newState).toEqual(initialState);
	});

	test('should handle GET_USER_SUCCESS action', () => {
		const initialState = {
			email: '',
			name: '',
			isAuth: false,
			token: '',
			role: '',
			errors: [],
		};
		const userData = {
			email: 'test@example.com',
			name: 'Test User',
			token: 'testtoken',
		};
		const action: UserAction = {
			type: UserActionTypes.GET_USER_SUCCESS,
			payload: userData,
		};
		const newState = userReducer(initialState, action);
		expect(newState).toEqual({
			...initialState,
			...userData,
			isAuth: true,
			errors: [],
		});
	});

	test('should handle GET_USER_ERROR action', () => {
		const initialState = {
			email: 'test@example.com',
			name: 'Test User',
			isAuth: true,
			token: 'testtoken',
			role: '',
			errors: [],
		};
		const errorData = ['Error 1', 'Error 2'];
		const action: UserAction = {
			type: UserActionTypes.GET_USER_ERROR,
			payload: errorData,
		};
		const newState = userReducer(initialState, action);
		expect(newState).toEqual({
			...initialState,
			errors: errorData,
			isAuth: false,
		});
	});
});
