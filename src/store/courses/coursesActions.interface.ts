import { CourseType } from './courses.type';
import { CoursesActionTypes } from './types';

interface CreateCourses {
	type: CoursesActionTypes.CREATE_COURSE;
	payload: CourseType;
}

interface FetchCourses {
	type: CoursesActionTypes.FETCH_COURSES;
}

interface FetchCoursesSuccess {
	type: CoursesActionTypes.FETCH_COURSES_SUCCESS;
	payload: CourseType[];
}

interface FetchCoursesFailure {
	type: CoursesActionTypes.FETCH_COURSES_FAILURE;
}

interface DeleteCourse {
	type: CoursesActionTypes.DELETE_COURSE;
	payload: string;
}

interface UpdateCourse {
	type: CoursesActionTypes.UPDATE_COURSE_SUCCESS;
	payload: CourseType;
}

export type CoursesAction =
	| CreateCourses
	| FetchCourses
	| FetchCoursesSuccess
	| FetchCoursesFailure
	| UpdateCourse
	| DeleteCourse;
