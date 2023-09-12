import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header/Header';
import { AppDispatch } from '../../store';
import { getUser } from '../../store/user/thunk';
import { getToken } from '../../store/user/selectors';
import { fetchCourses } from '../../store/courses/thunk';
import { UserActionTypes } from '../../store/user/types';

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
			dispatch({ type: UserActionTypes.SET_TOKEN, payload: token });
		}
	}, []);

	useEffect(() => {
		if (authToken) {
			dispatch(getUser());
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
