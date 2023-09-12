import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import styles from './CourseInfo.module.scss';
import { ButtonsName } from '../../assets/text/buttonsName';
import Button from '../../common/Button/Button';
import { getAuthorsName } from '../../helpers.ts/getAuthorsName';
import { getCourseDuration } from '../../helpers.ts/getCourseDuration';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseType } from '../../store/courses/courses.type';
import { useSelector } from 'react-redux';
import { getCourses } from '../../store/courses/selectors';
import { AuthorType } from '../../store/authors/authors.type';
import { getAuthors } from '../../store/authors/selectors';

export const CourseInfo = () => {
	const { courseId } = useParams();
	const courses: CourseType[] = useSelector(getCourses);
	const authors: AuthorType[] = useSelector(getAuthors);

	const navigate = useNavigate();

	const course = () => {
		return courses.find((course) => course.id === courseId);
	};

	const getAuthorsList = (authorsList: string[] | undefined) => {
		if (!authorsList) return;

		return getAuthorsName(authorsList, authors);
	};

	const onBack = () => {
		navigate('/courses', { replace: true });
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{course()?.title}</h2>
			<div className={styles.courseContainer}>
				<h3 className={styles.descriptionTitle}>{TEXT_BUNDLE.description}:</h3>
				<div className={styles.courseInfo}>
					<div className={styles.description}> {course()?.description}</div>
					<div className={styles.verticalLine}></div>
					<div className={styles.info}>
						<div>
							<span className={styles.infoTitle}>{TEXT_BUNDLE.id}:</span>{' '}
							{course()?.id}
						</div>
						<div>
							<span className={styles.infoTitle}>{TEXT_BUNDLE.duration}:</span>{' '}
							{getCourseDuration(course()?.duration)}
						</div>
						<div>
							<span className={styles.infoTitle}>{TEXT_BUNDLE.created}:</span>{' '}
							{course()?.creationDate.replaceAll('/', '.')}
						</div>
						<div>
							<span className={styles.infoTitle}>{TEXT_BUNDLE.authors}:</span>{' '}
							{getAuthorsList(course()?.authors)}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<div className={styles.buttonContainer_width}>
					<Button buttonText={ButtonsName.Back} onClick={onBack} />
				</div>
			</div>
		</div>
	);
};
