import { useState } from 'react';

import { CourseCard } from './CourseCard/CourseCard';
import styles from './Courses.module.scss';
import { Course } from '../../interfaces/course.interface';
import { SearchBar } from './SearchBar/SearchBar';
import { mockedCoursesList } from '../../assets/mock/mockCourseData';
import { ButtonsName } from '../../assets/text/buttonsName';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';

export const Courses = () => {
	const [courseList, setCourseList] = useState<Course[]>(mockedCoursesList);
	const navigate = useNavigate();

	const callback = (payload: string) => {
		const list = mockedCoursesList.filter((course: Course) => {
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
		<div className={styles.container}>
			<div className={styles.searchBar}>
				<SearchBar onSearchCourse={callback} />
				<div className={styles.buttonContainer}>
					<Button buttonText={ButtonsName.AddNewCourse} onClick={addCourse} />
				</div>
			</div>
			{courseList.map((course, index) => {
				return (
					<div className={styles.card} key={`card-${index}`}>
						<CourseCard props={course} />
					</div>
				);
			})}
		</div>
	);
};
