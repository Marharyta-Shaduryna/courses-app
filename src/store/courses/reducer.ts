import { CourseType } from './courses.type';
import { CoursesAction } from './coursesActions.interface';
import { CoursesActionTypes } from './types';

const initCoursesState = [] as CourseType[];

export function coursesReducer(
	state = initCoursesState,
	action: CoursesAction
) {
	switch (action.type) {
		case CoursesActionTypes.CREATE_COURSE:
			return [...state, action.payload];
		case CoursesActionTypes.EDIT_COURSE:
			return state.map((course) =>
				course.id === action.payload.id ? action.payload : course
			);
		case CoursesActionTypes.FETCH_COURSES_SUCCESS:
			return [...action.payload];
		case CoursesActionTypes.FETCH_COURSES_FAILURE:
			return [...state];
		case CoursesActionTypes.DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);

		default:
			return state;
	}
}
