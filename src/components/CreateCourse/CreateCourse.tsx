import { SubmitHandler, useForm } from 'react-hook-form';
import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import Input from '../../common/Input/Input';
import styles from './CreateCourse.module.scss';
import { getCourseDuration } from '../../helpers.ts/getCourseDuration';
import { ButtonsName } from '../../assets/text/buttonsName';
import Button from '../../common/Button/Button';
import { useEffect, useState } from 'react';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../helpers.ts/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import {
	createNewCourseAction,
	editCourseAction,
} from '../../store/courses/actions';
import { CourseType } from '../../store/courses/courses.type';
import { getCourses } from '../../store/courses/selectors';
import { getAuthors } from '../../store/authors/selectors';
import { AuthorType } from '../../store/authors/authors.type';
import {
	createNewAuthorAction,
	deleteAuthorAction,
} from '../../store/authors/actions';

type CourseData = {
	Title: string;
	Description: string;
	Duration: number;
	AuthorName: string;
};

export const CreateCourse = () => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<CourseData>();

	const dispatch = useDispatch<AppDispatch>();
	const courses: CourseType[] = useSelector(getCourses);
	const authorsList: AuthorType[] = useSelector(getAuthors);

	const navigate = useNavigate();
	const location = useLocation();
	const { courseId } = useParams();

	const watchedDuration = watch('Duration');
	const watchedAuthorName = watch('AuthorName');
	const [authors, setAuthors] = useState<AuthorType[]>([]);
	const [courseAuthors, setCourseAuthors] = useState<AuthorType[]>([]);
	const [authorsError, setAuthorsError] = useState('');
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		if (location.pathname.includes('/edit')) {
			setEditMode(true);
		}
	});

	useEffect(() => {
		if (editMode) {
			const course: CourseType | undefined = courses?.find(
				(course) => course.id === courseId
			);

			const authors = authorsList.filter(
				(author) => course?.authors.includes(author.id)
			);
			if (course) {
				setValue('Title', course.title);
				setValue('Description', course.description);
				setValue('Duration', course.duration);
				setCourseAuthors(authors);
			}
		}
	}, [editMode, location, setValue]);

	const onSubmit: SubmitHandler<CourseData> = (data) => {
		const courseData = {
			id: editMode && courseId ? courseId : uuidv4(),
			title: data.Title,
			description: data.Description,
			creationDate: formatDate(new Date()),
			duration: data.Duration,
			authors: courseAuthors.map((author) => author.id),
		};

		if (courseData.authors.length === 0) {
			setAuthorsError(TEXT_BUNDLE.noAuthorsError);
			return;
		}

		if (editMode) {
			dispatch(editCourseAction(courseData));
		} else {
			dispatch(createNewCourseAction(courseData));
		}

		navigate('/courses', { replace: true });
	};

	const createAuthor = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const newAuthor = {
			id: uuidv4(),
			name: watchedAuthorName,
		};
		dispatch(createNewAuthorAction(newAuthor));

		if (watchedAuthorName) {
			setAuthors([...authors, newAuthor]);
		}
		setValue('AuthorName', '');
	};
	const removeAuthor = (id: string) => {
		setAuthors(authors.filter((author) => author.id !== id));
		dispatch(deleteAuthorAction(id));
	};

	const addAuthor = (id: string) => {
		const author = authors.find((author) => author.id === id);
		if (author) {
			setCourseAuthors([...courseAuthors, author]);
			removeAuthor(id);
		}
	};

	const handleCancel = () => {
		navigate('/courses', { replace: true });
	};

	useEffect(() => {
		if (courseAuthors.length) {
			setAuthorsError('');
		}
	}, [courseAuthors]);

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2 className={styles.courseEditTitle}>{TEXT_BUNDLE.courseEdit}</h2>
				<div className={styles.courseContainer}>
					<h3 className={styles.secondaryTitle}>{TEXT_BUNDLE.mainInfo}</h3>

					<Input
						label='Title'
						{...register('Title', { required: true, minLength: 2 })}
						error={errors.Title}
					/>
					<label className={styles.textareaLabel}>
						{TEXT_BUNDLE.description}:
						<textarea
							{...register('Description', { required: true, minLength: 2 })}
							className={errors.Description ? styles.errorInput : ''}
						/>
						{errors.Description && (
							<span
								className={styles.error}
							>{`${TEXT_BUNDLE.description} is required`}</span>
						)}
					</label>
					<div className={styles.durationContainer}>
						<div className={styles.durationInput}>
							<Input
								label='Duration'
								{...register('Duration', { required: true, minLength: 2 })}
								error={errors.Duration}
								type='number'
							/>
						</div>
						<div className={styles.duration}>
							{watchedDuration && getCourseDuration(Number(watchedDuration))}
						</div>
					</div>

					<div className={styles.authorsContainer}>
						<div>
							<h3 className={styles.secondaryTitle}>{TEXT_BUNDLE.authors}</h3>
							<div className={styles.authorsContent}>
								<div className={styles.addAuthorsInput}>
									<Input
										label='Author Name'
										{...register('AuthorName', {
											required:
												authors.length || courseAuthors.length ? false : true,
											minLength: 2,
										})}
										error={errors.AuthorName}
										serverError={authorsError}
									/>
								</div>
								<div className={styles.createAuthorButton}>
									<Button
										buttonText={ButtonsName.CreateAuthor}
										onClick={createAuthor}
									/>
								</div>
							</div>
							{authors.length > 0 && (
								<h4 className={styles.tertiaryTitle}>
									{TEXT_BUNDLE.authorsList}
								</h4>
							)}
							{authors.length > 0 &&
								authors.map((author) => {
									return (
										<AuthorItem
											key={`author-${author.id}`}
											author={author}
											onAddAuthor={addAuthor}
											onRemoveAuthor={removeAuthor}
										/>
									);
								})}
						</div>
						<div>
							<h3 className={styles.secondaryTitle}>
								{TEXT_BUNDLE.courseAuthors}
							</h3>
							{courseAuthors.length > 0
								? courseAuthors.map((auth) => {
										return (
											<div key={`course-author-${auth.id}`}>{auth.name}</div>
										);
								  })
								: 'Author list is empty'}
						</div>
					</div>
				</div>
				<div className={styles.buttonsContainer}>
					<div style={{ width: '200px', marginRight: '16px' }}>
						<Button buttonText={ButtonsName.Cancel} onClick={handleCancel} />
					</div>
					<div style={{ width: '200px' }}>
						<Button
							buttonText={
								editMode ? ButtonsName.UpdateCourse : ButtonsName.CreateCourse
							}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
