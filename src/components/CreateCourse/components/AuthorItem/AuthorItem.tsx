import { TEXT_BUNDLE } from '../../../../assets/text/textbundle';
import { Author } from '../../../../interfaces/author.interface';
import styles from './AuthorItem.module.scss';

export const AuthorItem: React.FC<{
	author: Author;
	onAddAuthor: (id: string) => void;
	onRemoveAuthor: (id: string) => void;
}> = ({ author, onAddAuthor, onRemoveAuthor }) => {
	const removeAuthor = (e: React.SyntheticEvent) => {
		e.preventDefault();
		onRemoveAuthor(author.id);
	};

	const addToAuthorList = (e: React.SyntheticEvent) => {
		e.preventDefault();
		onAddAuthor(author.id);
	};

	return (
		<div className={styles.container}>
			<span
				className={styles.message}
			>{`${TEXT_BUNDLE.author} ${author.name}`}</span>
			<button className={styles.imgButton} onClick={addToAuthorList}>
				+
			</button>
			<button className={styles.imgButton} onClick={removeAuthor}>
				<img src='../trashbin.svg' alt='remove author' />
			</button>
		</div>
	);
};
