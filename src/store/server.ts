import axios from 'axios';
import { API_CONSTANTS } from '../helpers.ts/api-constants';
import { ArrayError } from './customErrors/customError';

type ErrorResponse = {
	response: {
		data: {
			errors: string[];
		};
	};
};

export const fetchCoursesFromAPI = async () => {
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

export const login = async (body: { email: string; password: string }) => {
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

export const register = async (body: {
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
