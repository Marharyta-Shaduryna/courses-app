import { AuthorsState } from './authors.type';

export const getAuthors = (state: AuthorsState) => {
	return state.authors;
};
