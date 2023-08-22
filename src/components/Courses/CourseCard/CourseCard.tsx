import React, { useCallback } from 'react';

import styles from './CourseCard.module.scss';
import Button from '../../../common/Button/Button';
import { ButtonsName } from '../../../assets/text/buttonsName';
import { getCourseDuration } from '../../../helpers.ts/getCourseDuration';
import { Course } from '../../../interfaces/course.interface';
import { TEXT_BUNDLE } from '../../../assets/text/textbundle';
import { getAuthorsName } from '../../../helpers.ts/getAuthorsName';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
	props: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ props }) => {
	const navigate = useNavigate();

	const getAuthors = useCallback(
		(authorsList: string[]) => {
			return getAuthorsName(authorsList);
		},
		[props.authors]
	);

	const showCourse = useCallback(() => {
		navigate(`/courses/${props.id}`, { replace: true });
	}, [props]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{props.title}</h1>
			<div className={styles.content}>
				<div className={styles.content__artical}>{props.description}</div>
				<div className={styles.content__courseInfo}>
					<div className={styles.content__courseOverview}>
						<div>
							<b>{TEXT_BUNDLE.authors}:</b> {getAuthors(props.authors)}
						</div>
						<div>
							<b>{TEXT_BUNDLE.duration}:</b> {getCourseDuration(props.duration)}
						</div>
						<div>
							<b>{TEXT_BUNDLE.created}:</b>{' '}
							{props.creationDate.replaceAll('/', '.')}
						</div>
					</div>
					<div className={styles.buttonsContainer}>
						<Button buttonText={ButtonsName.ShowCourse} onClick={showCourse} />
					</div>
				</div>
			</div>
		</div>
	);
};
