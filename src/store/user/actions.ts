import { UserActionTypes } from './types';

type GetUserSuccess = {
	type: UserActionTypes.GET_USER_SUCCESS;
	payload: { email: string; name: string; token: string };
};

export const getUserActionSuccess = (response: {
	email: string;
	name: string;
	token: string;
}): GetUserSuccess => ({
	type: UserActionTypes.GET_USER_SUCCESS,
	payload: response,
});

type GetUserError = {
	type: UserActionTypes.GET_USER_ERROR;
	payload: string[];
};

export const getUserActionError = (error: string[]): GetUserError => ({
	type: UserActionTypes.GET_USER_ERROR,
	payload: error,
});

type CreateUserAction = {
	type: UserActionTypes.CREATE_USER;
};

export const createUserAction = (): CreateUserAction => ({
	type: UserActionTypes.CREATE_USER,
});

type CreateUserError = {
	type: UserActionTypes.CREATE_USER_ERROR;
	payload: string[];
};

export const createUserActionError = (error: string[]): CreateUserError => ({
	type: UserActionTypes.CREATE_USER_ERROR,
	payload: error,
});

type ClearErrors = {
	type: UserActionTypes.CLEAR_ERRORS;
};

export const clearErrors = (): ClearErrors => ({
	type: UserActionTypes.CLEAR_ERRORS,
});

type SetUser = {
	type: UserActionTypes.SET_USER;
	payload: { email: string; name: string; role: string };
};

export const setUser = (user: {
	email: string;
	name: string;
	role: string;
}): SetUser => ({
	type: UserActionTypes.SET_USER,
	payload: user,
});

type Logout = {
	type: UserActionTypes.LOGOUT;
};

export const logout = (): Logout => ({
	type: UserActionTypes.LOGOUT,
});

type LogoutSuccess = {
	type: UserActionTypes.LOGOUT_SUCCESS;
};

export const logoutSuccess = (): LogoutSuccess => ({
	type: UserActionTypes.LOGOUT_SUCCESS,
});

type SetToken = {
	type: UserActionTypes.SET_TOKEN;
	payload: string;
};

export const setToken = (token: string): SetToken => ({
	type: UserActionTypes.SET_TOKEN,
	payload: token,
});
