import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
jest.mock('./store/server', () => {
	return {
		Server: jest.fn().mockImplementation(() => {
			return {
				getRole: jest.fn(),
			};
		}),
	};
});

describe('App', () => {
	test('navigates to Course page', async () => {
		const { getByText } = renderComponent();

		const title = getByText('React course');

		expect(title).toBeInTheDocument();
	});

	function renderComponent() {
		const initUserState = {
			user: {
				email: 'john@email.com',
				name: 'John Doe',
				isAuth: false,
				token: 'Bearer test-token',
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
					<App />
				</MemoryRouter>
			</Provider>
		);
	}
});
