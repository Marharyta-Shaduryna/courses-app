import { AuthorType } from './authors.type';
import { AuthorsAction } from './authorsActions.interface';
import { AuthorsActionTypes } from './types';

const initAuthorsState = [] as AuthorType[];

export function authorsReducer(
	state = initAuthorsState,
	action: AuthorsAction
) {
	switch (action.type) {
		case AuthorsActionTypes.FETCH_AUTHORS:
			return [...action.payload];
		case AuthorsActionTypes.CREATE_NEW_AUTHOR:
			return [...state, action.payload];
		case AuthorsActionTypes.DELETE_AUTHOR:
			return state.filter((author) => author.id !== action.payload);

		default:
			return state;
	}
}
