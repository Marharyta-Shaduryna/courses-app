import React, { useCallback } from 'react';
import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import styles from './CourseInfo.module.scss';
import { Course } from '../../interfaces/courseInterface';
import { ButtonsName } from '../../assets/text/buttonsName';
import Button from '../../common/Button/Button';
import { getAuthorsName } from '../../helpers.ts/getAuthorsName';
import { getCourseDuration } from '../../helpers.ts/getCourseDuration';

interface CourseInfoProps {
	course: Course | null;
	showCourses: () => void;
}

export const CourseInfo: React.FC<CourseInfoProps> = ({
	course,
	showCourses,
}) => {
	const getAuthors = useCallback(
		(authorsList: string[] | undefined) => {
			if (!authorsList) return;
			return getAuthorsName(authorsList);
		},
		[course?.authors]
	);

	const onBack = () => {
		showCourses();
	};
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{course?.title}</h2>
			<div className={styles.courseContainer}>
				<h3 className={styles.descriptionTitle}>{TEXT_BUNDLE.Description}:</h3>
				<div className={styles.courseInfo}>
					<div className={styles.description}> {course?.description}</div>
					<div className={styles.verticalLine}></div>
					<div className={styles.info}>
						<div>
							<span className={styles.infoTitle}>{TEXT_BUNDLE.ID}:</span>{' '}
							{course?.id}
						</div>
						<div>
							<span className={styles.infoTitle}>{TEXT_BUNDLE.duration}:</span>{' '}
							{getCourseDuration(course?.duration)}
						</div>
						<div>
							<span className={styles.infoTitle}>{TEXT_BUNDLE.created}:</span>{' '}
							{course?.creationDate.replaceAll('/', '.')}
						</div>
						<div>
							<span className={styles.infoTitle}>{TEXT_BUNDLE.authors}:</span>{' '}
							{getAuthors(course?.authors)}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<Button buttonText={ButtonsName.Back} onClick={onBack} />
			</div>
		</div>
	);
};
