import { UserActionTypes } from './types';

interface GetUserSuccess {
	type: UserActionTypes.GET_USER_SUCCESS;
	payload: { email: string; name: string; token: string };
}

interface GetUserError {
	type: UserActionTypes.GET_USER_ERROR;
	payload: string[];
}

interface RemoveUser {
	type: UserActionTypes.REMOVE_USER;
	payload: string;
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

export type UserAction =
	| GetUserSuccess
	| GetUserError
	| RemoveUser
	| CreateUser
	| ClearErrors
	| CreateUserError;
