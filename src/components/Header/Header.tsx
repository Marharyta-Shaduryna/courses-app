import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import Logo from './components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminRole, getName } from '../../store/user/selectors';
import { AppDispatch } from '../../store';
import { logoutUser } from '../../store/user/thunk';

export const Header = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [name, setName] = useState('');

	const navigate = useNavigate();

	const isAdmin = useSelector(getAdminRole);
	const userName = useSelector(getName);

	const dispatch = useDispatch<AppDispatch>();

	function logout() {
		dispatch(logoutUser());
		setIsLogin(false);
	}

	useEffect(() => {
		if (localStorage.getItem('AUTH_TOKEN_REACT_COURSE')?.includes('Bearer')) {
			setIsLogin(true);
		}
		isAdmin ? setName(userName) : setName('');
	}, [navigate, isAdmin, userName]);

	return (
		<div className={styles.container}>
			<Logo />
			{isLogin && (
				<div className={styles.loginContainer}>
					<div> {name}</div>
					<div className={styles.buttonContainer}>
						<Button buttonText={ButtonsName.Logout} onClick={logout} />
					</div>
				</div>
			)}
		</div>
	);
};
