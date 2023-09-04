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
import { useEffect, useState } from 'react';
import { getAdminRole } from '../../store/user/selectors';

export const Courses = () => {
	const courses: CourseType[] = useSelector(getCourses);

	const [courseList, setCourseList] = useState<CourseType[]>([]);

	const navigate = useNavigate();
	const isAdmin = useSelector(getAdminRole);
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

	useEffect(() => {
		setCourseList(courses);
	}, [courses]);

	return (
		<>
			{courses?.length ? (
				<div className={styles.container}>
					<div className={styles.searchBar}>
						<SearchBar onSearchCourse={callback} />
						{isAdmin && (
							<div className={styles.buttonContainer}>
								<Button
									buttonText={ButtonsName.AddNewCourse}
									onClick={addCourse}
								/>
							</div>
						)}
					</div>
					{courseList.map((course, index) => {
						return (
							<div className={styles.card} key={`card-${index}`}>
								<CourseCard props={course} isAdmin={isAdmin} />
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
