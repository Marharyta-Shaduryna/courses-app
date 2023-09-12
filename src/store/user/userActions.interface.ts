import { UserActionTypes } from './types';

interface GetUserSuccess {
	type: UserActionTypes.GET_USER_SUCCESS;
	payload: { email: string; name: string; token: string };
}

interface GetUserError {
	type: UserActionTypes.GET_USER_ERROR;
	payload: string[];
}

interface CreateUser {
	type: UserActionTypes.CREATE_USER;
}

interface CreateUserError {
	type: UserActionTypes.CREATE_USER_ERROR;
	payload: string[];
}

interface ClearErrors {
	type: UserActionTypes.CLEAR_ERRORS;
}

interface SetUser {
	type: UserActionTypes.SET_USER;
	payload: { email: string; name: string; role: string };
}

interface Logout {
	type: UserActionTypes.LOGOUT;
}

interface LogoutSuccess {
	type: UserActionTypes.LOGOUT_SUCCESS;
}

interface SetToken {
	type: UserActionTypes.SET_TOKEN;
	payload: string;
}

export type UserAction =
	| GetUserSuccess
	| GetUserError
	| CreateUser
	| ClearErrors
	| SetUser
	| Logout
	| LogoutSuccess
	| SetToken
	| CreateUserError;
