import { fetchCoursesFromAPI, login, register } from './server';
import {
	fetchCoursesActionSuccess,
	fetchCoursesActionFailure,
} from './courses/actions';

import { ThunkAction } from 'redux-thunk';
import { AppActions, RootState } from '.';
import { CourseType } from './courses/courses.type';
import { fetchAuthorsAction } from './authors/actions';
import { AuthorType } from './authors/authors.type';
import { UserAction } from './user/userActions.interface';
import {
	createUserAction,
	createUserActionError,
	getUserActionError,
	getUserActionSuccess,
} from './user/actions';
import { ArrayError } from './customErrors/customError';

export const fetchCourses =
	(): ThunkAction<void, RootState, unknown, AppActions> => async (dispatch) => {
		try {
			const response = await fetchCoursesFromAPI();
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

export const fetchUser =
	(body: {
		email: string;
		password: string;
	}): ThunkAction<void, RootState, unknown, UserAction> =>
	async (dispatch) => {
		try {
			const response = await login(body);
			if (response.successful) {
				localStorage.setItem(
					'AUTH_TOKEN_REACT_COURSE',
					JSON.stringify(response.result)
				);
				const { email, name } = response.user;

				const userData = {
					email,
					name,
					token: response.result,
				};

				dispatch(getUserActionSuccess(userData));
			} else {
				dispatch(getUserActionError(response?.result));
			}
		} catch (error) {
			if (error instanceof ArrayError) {
				dispatch(getUserActionError(error.errors));
			}
		}
	};

export const createUser =
	(body: {
		email: string;
		password: string;
		name: string;
	}): ThunkAction<Promise<boolean>, RootState, unknown, UserAction> =>
	async (dispatch) => {
		try {
			const response = await register(body);
			if (response.successful) {
				dispatch(createUserAction());
				return true;
			}
			return false;
		} catch (error) {
			if (error instanceof ArrayError) {
				dispatch(createUserActionError(error.errors));
				return false;
			}
			return false;
		}
	};
