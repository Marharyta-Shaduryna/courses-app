import { CourseCard } from './CourseCard/CourseCard';
import styles from './Courses.module.scss';
import { SearchBar } from './SearchBar/SearchBar';
import { ButtonsName } from '../../assets/text/buttonsName';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { useSelector } from 'react-redux';
import { getCourses } from '../../store/courses/selectors';
import { CourseType } from '../../store/courses/courses.type';
import { useState } from 'react';

export const Courses = () => {
	const courses: CourseType[] = useSelector(getCourses);
	const [courseList, setCourseList] = useState<CourseType[]>(courses);

	const navigate = useNavigate();

	const callback = (payload: string) => {
		const list = courses.filter((course: CourseType) => {
			return course.title
				.toLocaleLowerCase()
				.includes(payload.toLocaleLowerCase());
		});
		setCourseList(list);
	};

	const addCourse = () => {
		navigate('/courses/add', { replace: true });
	};

	return (
		<>
			{courses?.length ? (
				<div className={styles.container}>
					<div className={styles.searchBar}>
						<SearchBar onSearchCourse={callback} />
						<div className={styles.buttonContainer}>
							<Button
								buttonText={ButtonsName.AddNewCourse}
								onClick={addCourse}
							/>
						</div>
					</div>
					{courseList?.map((course, index) => {
						return (
							<div className={styles.card} key={`card-${index}`}>
								<CourseCard props={course} />
							</div>
						);
					})}
				</div>
			) : (
				<div className={styles.emptyCourseContainer}>
					<EmptyCourseList />
				</div>
			)}
		</>
	);
};
