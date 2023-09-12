import { AuthorsAction } from '../authorsActions.interface';
import { authorsReducer } from '../reducer';
import { AuthorsActionTypes } from '../types';

describe('authorsReducer', () => {
	test('should return the initial state', () => {
		const action = {} as AuthorsAction;
		const newState = authorsReducer([], action);
		expect(newState).toEqual([]);
	});

	test('should handle FETCH_AUTHORS action', () => {
		const authorsData = [
			{ id: '1', name: 'Author 1' },
			{ id: '2', name: 'Author 2' },
		];
		const action: AuthorsAction = {
			type: AuthorsActionTypes.FETCH_AUTHORS,
			payload: authorsData,
		};
		const newState = authorsReducer([], action);
		expect(newState).toEqual(authorsData);
	});

	test('should handle CREATE_NEW_AUTHOR action', () => {
		const initialState = [{ id: '3', name: 'Author 3' }];
		const newAuthor = { id: '4', name: 'Author 4' };
		const action: AuthorsAction = {
			type: AuthorsActionTypes.CREATE_NEW_AUTHOR,
			payload: newAuthor,
		};
		const newState = authorsReducer(initialState, action);
		expect(newState).toEqual([...initialState, newAuthor]);
	});

	test('should handle DELETE_AUTHOR action', () => {
		const initialState = [
			{ id: '1', name: 'Author 1' },
			{ id: '2', name: 'Author 2' },
		];
		const action: AuthorsAction = {
			type: AuthorsActionTypes.DELETE_AUTHOR,
			payload: '2',
		};
		const newState = authorsReducer(initialState, action);
		expect(newState).toEqual([{ id: '1', name: 'Author 1' }]);
	});
});
