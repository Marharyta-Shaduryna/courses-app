import { UserState } from './userState.type';

export const getEmail = (state: UserState) => {
	return state.user.email;
};
export const getName = (state: UserState) => {
	return state.user.name;
};
export const getToken = (state: UserState) => {
	return state.user.token;
};
export const getErrors = (state: UserState) => {
	return state.user.errors;
};

export const getIsAuth = (state: UserState) => {
	return state.user.isAuth;
};

export const getAdminRole = (state: UserState) => {
	return state.user.role === 'admin';
};
