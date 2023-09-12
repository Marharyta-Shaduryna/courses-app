import { render } from '@testing-library/react';
import { Header } from '../Header';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

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

describe('Header Component', () => {
	beforeAll(() => {
		localStorage.setItem('AUTH_TOKEN_REACT_COURSE', 'Bearer test-token');
	});
	afterAll(() => {
		localStorage.removeItem('AUTH_TOKEN_REACT_COURSE');
	});
	test('should render the logo', () => {
		const { getByAltText } = renderComponent();

		const logo = getByAltText('logo');

		expect(logo).toBeInTheDocument();
	});

	test('should display the username when logged in', () => {
		const { getByText } = renderComponent();
		const usernameElement = getByText('John Doe');

		expect(usernameElement).toBeInTheDocument();
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
		};
		const store = mockStore(initUserState);

		return render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/courses']}>
					<Routes>
						<Route path={'/courses'} element={<Header />} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	}
});
