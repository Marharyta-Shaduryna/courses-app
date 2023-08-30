import { AuthorType } from './authors.type';
import { AuthorsActionTypes } from './types';

type FetchAuthorsAction = {
	type: AuthorsActionTypes.FETCH_AUTHORS;
	payload: AuthorType[];
};

export const fetchAuthorsAction = (
	authors: AuthorType[]
): FetchAuthorsAction => ({
	type: AuthorsActionTypes.FETCH_AUTHORS,
	payload: authors,
});

type CreateNewAuthorAction = {
	type: AuthorsActionTypes.CREATE_NEW_AUTHOR;
	payload: AuthorType;
};

export const createNewAuthorAction = (
	author: AuthorType
): CreateNewAuthorAction => ({
	type: AuthorsActionTypes.CREATE_NEW_AUTHOR,
	payload: author,
});

type DeleteAuthorAction = {
	type: AuthorsActionTypes.DELETE_AUTHOR;
	payload: string;
};

export const deleteAuthorAction = (authorId: string): DeleteAuthorAction => ({
	type: AuthorsActionTypes.DELETE_AUTHOR,
	payload: authorId,
});
