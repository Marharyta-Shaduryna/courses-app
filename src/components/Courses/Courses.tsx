import React, { useState } from 'react';

import { CourseCard } from './CourseCard/CourseCard';
import styles from './Courses.module.scss';
import { Course } from '../../interfaces/courseInterface';
import { SearchBar } from './SearchBar/SearchBar';
interface CoursesProps {
	courses: Course[];
	showCourse: (course: Course) => void;
}

export const Courses: React.FC<CoursesProps> = ({ courses, showCourse }) => {
	const [courseList, setCourseList] = useState<Course[]>(courses);

	const callback = (payload: string) => {
		const list = courses.filter((course: Course) => {
			return course.title
				.toLocaleLowerCase()
				.includes(payload.toLocaleLowerCase());
		});

		setCourseList(list);
	};

	return (
		<div className={styles.container}>
			<SearchBar onSearchCourse={callback} />
			{courseList.map((course, index) => {
				return (
					<div className={styles.card} key={`card-${index}`}>
						<CourseCard props={course} showCurrentCourse={showCourse} />
					</div>
				);
			})}
		</div>
	);
};
