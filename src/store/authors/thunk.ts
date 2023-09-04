import { Dispatch } from 'redux';
import { AuthorType } from './authors.type';
import { createNewAuthorAction } from './actions';
import { Server } from '../server';

const server = new Server();

export const createAuthor = (author: AuthorType) => {
	return async (dispatch: Dispatch) => {
		try {
			const createAuthor = await server.createNewAuthor(author);
			dispatch(createNewAuthorAction(createAuthor));
			return createAuthor;
		} catch (error) {
			console.log('error', error);
		}
	};
};
