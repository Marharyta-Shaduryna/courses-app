import { CoursesAction } from '../coursesActions.interface';
import { coursesReducer } from '../reducer';
import { CoursesActionTypes } from '../types';

describe('coursesReducer', () => {
	test('should return the initial state', () => {
		const action = {} as CoursesAction;
		const newState = coursesReducer([], action);
		expect(newState).toEqual([]);
	});

	test('should handle CREATE_COURSE action', () => {
		const courseData = {
			id: '1',
			title: 'Course 1',
			description: 'description',
			creationDate: '1.10.2020',
			duration: 12,
			authors: ['1', '2'],
		};
		const action: CoursesAction = {
			type: CoursesActionTypes.CREATE_COURSE,
			payload: courseData,
		};
		const newState = coursesReducer([], action);
		expect(newState).toEqual([courseData]);
	});

	test('should handle UPDATE_COURSE_SUCCESS action', () => {
		const initialState = [
			{
				id: '1',
				title: 'Course 1',
				description: 'description',
				creationDate: '1.10.2020',
				duration: 12,
				authors: ['1', '2'],
			},
			{
				id: '2',
				title: 'Course 1',
				description: 'description 2',
				creationDate: '1.10.2020',
				duration: 20,
				authors: ['1', '2'],
			},
		];
		const updatedCourse = {
			id: '2',
			title: 'Updated Course 2',
			description: 'description 2',
			creationDate: '1.10.2020',
			duration: 20,
			authors: ['1', '2'],
		};
		const action: CoursesAction = {
			type: CoursesActionTypes.UPDATE_COURSE_SUCCESS,
			payload: updatedCourse,
		};
		const newState = coursesReducer(initialState, action);
		expect(newState).toEqual([
			{
				id: '1',
				title: 'Course 1',
				description: 'description',
				creationDate: '1.10.2020',
				duration: 12,
				authors: ['1', '2'],
			},
			{
				id: '2',
				title: 'Updated Course 2',
				description: 'description 2',
				creationDate: '1.10.2020',
				duration: 20,
				authors: ['1', '2'],
			},
		]);
	});

	test('should handle FETCH_COURSES_SUCCESS action', () => {
		const coursesData = [
			{
				id: '1',
				title: 'Course 1',
				description: 'description',
				creationDate: '1.10.2020',
				duration: 12,
				authors: ['1', '2'],
			},
			{
				id: '2',
				title: 'Course 1',
				description: 'description 2',
				creationDate: '1.10.2020',
				duration: 20,
				authors: ['1', '2'],
			},
		];
		const action: CoursesAction = {
			type: CoursesActionTypes.FETCH_COURSES_SUCCESS,
			payload: coursesData,
		};
		const newState = coursesReducer([], action);
		expect(newState).toEqual(coursesData);
	});

	test('should handle DELETE_COURSE action', () => {
		const initialState = [
			{
				id: '1',
				title: 'Course 1',
				description: 'description',
				creationDate: '1.10.2020',
				duration: 12,
				authors: ['1', '2'],
			},
			{
				id: '2',
				title: 'Course 1',
				description: 'description 2',
				creationDate: '1.10.2020',
				duration: 20,
				authors: ['1', '2'],
			},
		];
		const action: CoursesAction = {
			type: CoursesActionTypes.DELETE_COURSE,
			payload: '2',
		};
		const newState = coursesReducer(initialState, action);
		expect(newState).toEqual([
			{
				id: '1',
				title: 'Course 1',
				description: 'description',
				creationDate: '1.10.2020',
				duration: 12,
				authors: ['1', '2'],
			},
		]);
	});
});
