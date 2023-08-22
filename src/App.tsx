import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import styles from './App.module.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const App = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [hasNavigated, setHasNavigated] = useState(false);

	useEffect(() => {
		if (hasNavigated) return;

		const isToken = localStorage.getItem('AUTH_TOKEN_REACT_COURSE');
		const isAuthPages =
			location.pathname === '/registration' || location.pathname === '/login';
		if (isToken && isToken.includes('Bearer')) {
			navigate('/courses', { replace: true });
			setHasNavigated(true);
		} else if (!isAuthPages) {
			navigate('/login', { replace: true });
			setHasNavigated(true);
		}
	}, [navigate, location, hasNavigated]);

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
