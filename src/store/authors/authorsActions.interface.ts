import { AuthorType } from './authors.type';
import { AuthorsActionTypes } from './types';

interface FetchAuthorsSuccess {
	type: AuthorsActionTypes.FETCH_AUTHORS;
	payload: AuthorType[];
}
interface CreateNewAuthorAction {
	type: AuthorsActionTypes.CREATE_NEW_AUTHOR;
	payload: AuthorType;
}

interface DeleteAuthorAction {
	type: AuthorsActionTypes.DELETE_AUTHOR;
	payload: string;
}

export type AuthorsAction =
	| FetchAuthorsSuccess
	| CreateNewAuthorAction
	| DeleteAuthorAction;
