import { fireEvent, render, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Courses } from '../Courses';
import { PrivateRoute } from '../../PrivateRoute/PrivateRoute';
import { CourseForm } from '../../CourseForm/CourseForm';

const mockStore = configureMockStore();

jest.mock('../../../store/server', () => {
	return {
		Server: jest.fn().mockImplementation(() => {
			return {
				fetchCoursesFromAPI: jest.fn(),
				getRole: jest.fn(),
			};
		}),
	};
});

describe('Courses', () => {
	beforeAll(() => {
		localStorage.setItem('AUTH_TOKEN_REACT_COURSE', 'Bearer test-token');
	});
	afterAll(() => {
		localStorage.removeItem('AUTH_TOKEN_REACT_COURSE');
	});

	test('should display titles of CourseCards', () => {
		const { getByText } = renderComponent();

		const reactTitle = getByText('React course');
		const angularTitle = getByText('Angular course');

		expect(reactTitle).toBeInTheDocument();
		expect(angularTitle).toBeInTheDocument();
	});

	test('should display amount of CourseCard equal length of courses array.', () => {
		const { getAllByRole } = renderComponent();
		const courseCars = getAllByRole('article');

		expect(courseCars).toHaveLength(2);
	});

	test('CourseForm should be shown after a click on the "Add new course" button', async () => {
		const { getByText, queryByTestId } = renderComponent();

		const courseForm = queryByTestId('course-form');
		expect(courseForm).toBeNull();

		const addCourseButton = getByText('Add new course');
		fireEvent.click(addCourseButton);

		await waitFor(() => {
			const courseFormAfterClick = queryByTestId('course-form');
			expect(courseFormAfterClick).toBeInTheDocument();
		});
	});

	function renderComponent() {
		const initUserState = {
			user: {
				email: 'john@email.com',
				name: 'John Doe',
				isAuth: false,
				token: '',
				role: 'admin',
				errors: [],
			},
			courses: [
				{
					id: '1',
					title: 'React course',
					description: 'description for React course',
					creationDate: '9/3/2021',
					duration: 123,
					authors: ['123', '456'],
				},
				{
					id: '2',
					title: 'Angular course',
					description: 'description for Angular course',
					creationDate: '9/3/2021',
					duration: 123,
					authors: ['123', '456'],
				},
			],
			authors: [
				{ id: '123', name: 'Rita' },
				{ id: '456', name: 'John' },
			],
		};

		const store = mockStore(initUserState);

		return render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/courses']}>
					<Routes>
						<Route path={'/courses'} element={<Courses />} />
						<Route
							path='courses/add'
							element={
								<PrivateRoute>
									<CourseForm />
								</PrivateRoute>
							}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	}
});
