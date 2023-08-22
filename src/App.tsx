import React, { useState } from 'react';
import { Courses } from './components/Courses/Courses';
import { Header } from './components/Header/Header';
import { mockedCoursesList } from './assets/mock/mockCourseData';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import styles from './App.module.scss';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { Course } from './interfaces/courseInterface';

const App = () => {
	const [isCourses, setIsCourses] = useState(true);
	const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

	const showCurrentCourse = (payload: Course) => {
		setIsCourses(false);
		setCurrentCourse(payload);
	};
	const showAllCourses = () => setIsCourses(true);

	return (
		<div>
			<Header />
			<div className={styles.container}>
				{mockedCoursesList && mockedCoursesList.length > 0 ? (
					isCourses ? (
						<Courses
							courses={mockedCoursesList}
							showCourse={showCurrentCourse}
						/>
					) : (
						<CourseInfo course={currentCourse} showCourses={showAllCourses} />
					)
				) : (
					<EmptyCourseList />
				)}
			</div>
		</div>
	);
};

export default App;
