import { AuthorType } from '../store/authors/authors.type';

export function getAuthorsName(
	authorsList: string[],
	authors: AuthorType[]
): string {
	const authorsName = authorsList
		.map((authorId) => authors?.find((i) => i.id === authorId)?.name || '')
		.join(', ');

	return authorsName.length > 40
		? authorsName.slice(0, 40) + '...'
		: authorsName;
}
