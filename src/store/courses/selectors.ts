import { CoursesState } from './courses.type';

export const getCourses = (state: CoursesState) => {
	return state.courses;
};
