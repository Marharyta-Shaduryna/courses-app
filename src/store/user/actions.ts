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

export type RemoveUserAction = {
	type: UserActionTypes.REMOVE_USER;
};

export const removeUserAction = (): RemoveUserAction => ({
	type: UserActionTypes.REMOVE_USER,
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
