import { mockedAuthorsList } from '../assets/mock/mockCourseData';

export function getAuthorsName(authorsList: string[]): string {
	const authors = authorsList
		.map(
			(authorId) =>
				mockedAuthorsList?.find((i) => i.id === authorId)?.name || ''
		)
		.join(', ');

	return authors.length > 40 ? authors.slice(0, 40) + '...' : authors;
}
