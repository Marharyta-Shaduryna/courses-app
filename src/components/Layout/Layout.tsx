import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header/Header';
import { AppDispatch } from '../../store';
import { getUser, setAuthToken } from '../../store/user/thunk';
import { getToken } from '../../store/user/selectors';
import { fetchCourses } from '../../store/courses/thunk';

export interface ChildrenRoutes {
	children: ReactNode;
}
const Layout: React.FC<ChildrenRoutes> = ({ children }) => {
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();
	const authToken = useSelector(getToken);
	const token = localStorage.getItem('AUTH_TOKEN_REACT_COURSE');

	useEffect(() => {
		if (token && token.includes('Bearer')) {
			dispatch(setAuthToken(token));
			dispatch(getUser());
		}
	}, []);

	useEffect(() => {
		if (authToken) {
			dispatch(fetchCourses());
			navigate('/courses', { replace: true });
		} else {
			navigate('/login', { replace: true });
		}
	}, [authToken]);

	return (
		<div>
			<Header />
			<div>{children}</div>
		</div>
	);
};

export default Layout;
