import { Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { AppActions, RootState } from '..';
import { Server } from '../server';
import { CourseType } from './courses.type';
import { AuthorType } from '../authors/authors.type';
import {
	createNewCourseAction,
	deleteCourseAction,
	fetchCoursesActionFailure,
	fetchCoursesActionSuccess,
	updateCourseAction,
} from './actions';
import { fetchAuthorsAction } from '../authors/actions';

const server = new Server();

export const deleteCourse = (id: string) => {
	return async (dispatch: Dispatch) => {
		try {
			await server.deleteCourseById(id);
			dispatch(deleteCourseAction(id));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const updateCourse = (id: string, course: CourseType) => {
	return async (dispatch: Dispatch) => {
		try {
			const updatedCourse = await server.updateCourseById(id, course);
			dispatch(updateCourseAction(updatedCourse));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const createNewCourse = (course: CourseType) => {
	return async (dispatch: Dispatch) => {
		try {
			const newCourse = await server.addNewCourse(course);
			dispatch(createNewCourseAction(newCourse));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const fetchCourses =
	(): ThunkAction<void, RootState, unknown, AppActions> => async (dispatch) => {
		try {
			const response = await server.fetchCoursesFromAPI();
			const authors = response.authors;
			const courses = response.courses.map((course: CourseType) => {
				const authorsIds = response.authors
					.filter((author: AuthorType) => course.authors.includes(author.id))
					.map((author: AuthorType) => author.id);

				return {
					...course,
					authors: authorsIds,
				};
			});
			dispatch(fetchCoursesActionSuccess(courses));
			dispatch(fetchAuthorsAction(authors));
		} catch (error) {
			dispatch(fetchCoursesActionFailure(''));
		}
	};
