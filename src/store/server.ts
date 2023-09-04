import axios from 'axios';
import { API_CONSTANTS } from '../helpers.ts/api-constants';
import { ArrayError } from './customErrors/customError';
import { CourseType } from './courses/courses.type';
import { AuthorType } from './authors/authors.type';
import { axiosInstance } from './interceptor';

type ErrorResponse = {
	response: {
		data: {
			errors: string[];
		};
	};
};

export class Server {
	public fetchCoursesFromAPI = async () => {
		try {
			const [coursesResponse, authorsResponse] = await Promise.all([
				axios.get(API_CONSTANTS.courses),
				axios.get(API_CONSTANTS.authors),
			]);

			const courses = coursesResponse.data.result;
			const authors = authorsResponse.data.result;

			return {
				courses,
				authors,
			};
		} catch (error) {
			throw new Error('Failed to fetch courses and authors: ' + error);
		}
	};

	public login = async (body: { email: string; password: string }) => {
		try {
			const response = await axios.post(API_CONSTANTS.login, body);
			if (response.data.successful) {
				return response.data;
			}
		} catch (error) {
			const errorsArray = (error as ErrorResponse).response.data.errors;
			throw new ArrayError(errorsArray);
		}
	};

	public register = async (body: {
		email: string;
		password: string;
		name: string;
	}) => {
		try {
			const response = await axios.post(API_CONSTANTS.registration, body);
			if (response.data.successful) {
				return response.data;
			}
		} catch (error) {
			const errorsArray = (error as ErrorResponse).response.data.errors;
			throw new ArrayError(errorsArray);
		}
	};

	public getRole = async () => {
		try {
			const response = await axiosInstance.get(API_CONSTANTS.currentUser);
			return response.data.result;
		} catch (error) {
			const errorsArray = (error as ErrorResponse).response.data.errors;
			throw new ArrayError(errorsArray);
		}
	};

	public logout = async () => {
		try {
			await axiosInstance.delete(API_CONSTANTS.logout);
		} catch (error) {
			const errorsArray = (error as ErrorResponse).response.data.errors;
			throw new ArrayError(errorsArray);
		}
	};

	public deleteCourseById = async (id: string) => {
		try {
			await axiosInstance.delete(`${API_CONSTANTS.deleteCourse}/${id}`);
		} catch (error) {
			const errorsArray = (error as ErrorResponse).response.data.errors;
			throw new ArrayError(errorsArray);
		}
	};

	public addCourse = async () => {
		try {
			await axiosInstance.post(API_CONSTANTS.addCourse);
		} catch (error) {
			const errorsArray = (error as ErrorResponse).response.data.errors;
			throw new ArrayError(errorsArray);
		}
	};

	public updateCourseById = async (id: string, body: CourseType) => {
		try {
			const response = await axiosInstance.put(
				`${API_CONSTANTS.updateCourse}/${id}`,
				body
			);
			if (response.data.successful) {
				return response.data.result;
			}
		} catch (error) {
			const errorsArray = (error as ErrorResponse).response.data.errors;
			throw new ArrayError(errorsArray);
		}
	};

	public addNewCourse = async (body: CourseType) => {
		try {
			const response = await axiosInstance.post(
				`${API_CONSTANTS.addCourse}`,
				body
			);
			if (response.data.successful) {
				return response.data.result;
			}
		} catch (error) {
			const errorsArray = (error as ErrorResponse).response.data.errors;
			throw new ArrayError(errorsArray);
		}
	};

	public createNewAuthor = async (author: AuthorType) => {
		try {
			const response = await axiosInstance.post(
				`${API_CONSTANTS.createAuthor}`,
				author
			);
			if (response.data.successful) {
				return response.data.result;
			}
		} catch (error) {
			const errorsArray = (error as ErrorResponse).response.data.errors;
			throw new ArrayError(errorsArray);
		}
	};
}
