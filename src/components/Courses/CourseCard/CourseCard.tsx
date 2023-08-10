import React, { useCallback } from 'react';

import styles from './CourseCard.module.scss';
import Button from '../../../common/Button/Button';
import { ButtonsName } from '../../../assets/text/buttonsName';
import { mockedAuthorsList } from '../../../assets/mock/mockCourseData';
import { getCourseDuration } from '../../../helpers.ts/getCourseDuration';
import { Course } from '../../../interfaces/courseInterface';

export const CourseCard: React.FC<Course> = (props) => {
	const getAuthors = useCallback(
		(authorsList: string[]) => {
			const authors = authorsList
				.map(
					(authorId) =>
						mockedAuthorsList?.find((i) => i.id === authorId)?.name || ''
				)
				.join(', ');

			return authors.length > 40 ? authors.slice(0, 40) + '...' : authors;
		},
		[props.authors]
	);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{props.title}</h1>
			<div className={styles.content}>
				<div className={styles.content__artical}>{props.description}</div>
				<div className={styles.content__courseInfo}>
					<div className={styles.content__courseOverview}>
						<div>
							<b>Authors:</b> {getAuthors(props.authors)}
						</div>
						<div>
							<b>Duration:</b> {getCourseDuration(props.duration)}
						</div>
						<div>
							<b>Created:</b> {props.creationDate.replaceAll('/', '.')}
						</div>
					</div>
					<div className={styles.buttonsContainer}>
						<Button buttonText={ButtonsName.ShowCourse} />
					</div>
				</div>
			</div>
		</div>
	);
};
