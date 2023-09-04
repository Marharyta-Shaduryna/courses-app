import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { UserAction } from './userActions.interface';
import { Server } from '../server';
import {
	createUserAction,
	createUserActionError,
	getUserActionError,
	getUserActionSuccess,
	logoutSuccess,
	setToken,
	setUser,
} from './actions';
import { ArrayError } from '../customErrors/customError';

import { Dispatch } from 'redux';

const server = new Server();

export const getUser = () => {
	return async (dispatch: Dispatch) => {
		try {
			const user = await server.getRole();
			dispatch(setUser(user));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const setAuthToken = (token: string) => {
	return (dispatch: Dispatch) => {
		try {
			dispatch(setToken(token));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const logoutUser = () => {
	return async (dispatch: Dispatch) => {
		try {
			await server.logout();
			localStorage.removeItem('AUTH_TOKEN_REACT_COURSE');
			dispatch(logoutSuccess());
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const fetchUser =
	(body: {
		email: string;
		password: string;
	}): ThunkAction<void, RootState, unknown, UserAction> =>
	async (dispatch) => {
		try {
			const response = await server.login(body);
			if (response.successful) {
				localStorage.setItem('AUTH_TOKEN_REACT_COURSE', response.result);
				const { email, name } = response.user;

				const userData = {
					email,
					name,
					token: response.result,
				};

				dispatch(getUserActionSuccess(userData));
			} else {
				dispatch(getUserActionError(response?.result));
			}
		} catch (error) {
			if (error instanceof ArrayError) {
				dispatch(getUserActionError(error.errors));
			}
		}
	};

export const createUser =
	(body: {
		email: string;
		password: string;
		name: string;
	}): ThunkAction<Promise<boolean>, RootState, unknown, UserAction> =>
	async (dispatch) => {
		try {
			const response = await server.register(body);
			if (response.successful) {
				dispatch(createUserAction());
				return true;
			}
			return false;
		} catch (error) {
			if (error instanceof ArrayError) {
				dispatch(createUserActionError(error.errors));
				return false;
			}
			return false;
		}
	};
