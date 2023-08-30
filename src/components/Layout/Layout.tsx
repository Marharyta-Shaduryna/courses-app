import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../store/user/selectors';
import { Header } from '../Header/Header';

interface ChildrenRoutes {
	children: ReactNode;
}
const Layout: React.FC<ChildrenRoutes> = ({ children }) => {
	const navigate = useNavigate();
	const isAuth = useSelector(getIsAuth);

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
			<div>{children}</div>
		</div>
	);
};

export default Layout;
