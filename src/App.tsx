import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import styles from './App.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchCourses } from './store/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { getIsAuth } from './store/user/selectors';

const App = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();
	const isAuth = useSelector(getIsAuth);

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	useEffect(() => {
		const isToken = localStorage.getItem('AUTH_TOKEN_REACT_COURSE');
		if (isAuth && isToken && isToken.includes('Bearer')) {
			navigate('/courses', { replace: true });
		}
		if (!isAuth) {
			navigate('/login', { replace: true });
		}
	}, [isAuth]);

	return (
		<div>
			<Header />
			<div className={styles.container}>
				<div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default App;
