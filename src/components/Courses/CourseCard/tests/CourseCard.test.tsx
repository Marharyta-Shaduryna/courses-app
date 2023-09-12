import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CourseCard } from '../CourseCard';

const mockStore = configureMockStore();

jest.mock('../../../../store/server', () => {
	return {
		Server: jest.fn().mockImplementation(() => {
			return {
				fetchCoursesFromAPI: jest.fn(),
				getRole: jest.fn(),
			};
		}),
	};
});

describe('CourseCard', () => {
	beforeAll(() => {
		localStorage.setItem('AUTH_TOKEN_REACT_COURSE', 'Bearer test-token');
	});
	afterAll(() => {
		localStorage.removeItem('AUTH_TOKEN_REACT_COURSE');
	});
	test('should display title', () => {
		const { getByText } = renderComponent();

		const title = getByText('React course');

		expect(title).toBeInTheDocument();
	});

	test('should display description', () => {
		const { getByText } = renderComponent();
		const description = getByText('description for React course');

		expect(description).toBeInTheDocument();
	});

	test('should display duration in the correct format', () => {
		const { getByText } = renderComponent();
		const duration = getByText('02:03 hours');

		expect(duration).toBeInTheDocument();
	});

	test('should display authors list', () => {
		const { getByText } = renderComponent();
		const authors = getByText('Rita, John');

		expect(authors).toBeInTheDocument();
	});

	test('should display created date in the correct format', () => {
		const { getByText } = renderComponent();
		const creationDate = getByText('9.3.2021');

		expect(creationDate).toBeInTheDocument();
	});

	function renderComponent() {
		const initUserState = {
			user: {
				email: 'john@email.com',
				name: 'John Doe',
				isAuth: false,
				token: '',
				role: 'user',
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
			],
			authors: [
				{ id: '123', name: 'Rita' },
				{ id: '456', name: 'John' },
			],
		};
		const store = mockStore(initUserState);
		const course = {
			id: '1',
			title: 'React course',
			description: 'description for React course',
			creationDate: '9/3/2021',
			duration: 123,
			authors: ['123', '456'],
		};

		return render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/courses']}>
					<Routes>
						<Route
							path={'/courses'}
							element={<CourseCard props={course} isAdmin={true} />}
						/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	}
});
