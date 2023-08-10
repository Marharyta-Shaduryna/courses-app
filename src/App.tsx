import React from 'react';
import { Courses } from './components/Courses/Courses';
import { Header } from './components/Header/Header';
import { mockedCoursesList } from './assets/mock/mockCourseData';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import styles from './App.module.scss';
const App = () => {
	return (
		<div>
			<Header />
			<div className={styles.container}>
				{mockedCoursesList && mockedCoursesList.length > 0 ? (
					<Courses courses={mockedCoursesList} />
				) : (
					<EmptyCourseList />
				)}
			</div>
		</div>
	);
};

export default App;
