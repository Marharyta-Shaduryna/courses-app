import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getAdminRole } from '../../store/user/selectors';

interface AdminRouteProps {
	children: React.ReactNode;
}

export const PrivateRoute: React.FC<AdminRouteProps> = ({ children }) => {
	const isAdmin = useSelector(getAdminRole);

	return isAdmin ? <>{children}</> : <Navigate to='/login' />;
};
