import { CourseType } from './courses.type';
import { CoursesActionTypes } from './types';

type CreateNewCourseAction = {
	type: CoursesActionTypes.CREATE_COURSE;
	payload: CourseType;
};

export const createNewCourseAction = (
	course: CourseType
): CreateNewCourseAction => ({
	type: CoursesActionTypes.CREATE_COURSE,
	payload: course,
});

type DeleteCourseAction = {
	type: CoursesActionTypes.DELETE_COURSE;
	payload: string;
};

export const deleteCourseAction = (courseId: string): DeleteCourseAction => ({
	type: CoursesActionTypes.DELETE_COURSE,
	payload: courseId,
});

type EditCourseAction = {
	type: CoursesActionTypes.EDIT_COURSE;
	payload: CourseType;
};

export const editCourseAction = (course: CourseType): EditCourseAction => ({
	type: CoursesActionTypes.EDIT_COURSE,
	payload: course,
});

type FetchCoursesAction = {
	type: CoursesActionTypes.FETCH_COURSES;
};

export const fetchCoursesAction = (): FetchCoursesAction => ({
	type: CoursesActionTypes.FETCH_COURSES,
});

type FetchCoursesActionSuccess = {
	type: CoursesActionTypes.FETCH_COURSES_SUCCESS;
	payload: CourseType[];
};

export const fetchCoursesActionSuccess = (
	courses: CourseType[]
): FetchCoursesActionSuccess => ({
	type: CoursesActionTypes.FETCH_COURSES_SUCCESS,
	payload: courses,
});

type FetchCoursesActionFailure = {
	type: CoursesActionTypes.FETCH_COURSES_FAILURE;
	error: string | null;
};

export const fetchCoursesActionFailure = (
	error: string | null
): FetchCoursesActionFailure => ({
	type: CoursesActionTypes.FETCH_COURSES_FAILURE,
	error: error,
});
