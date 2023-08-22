import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import Logo from './components/Logo/Logo';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [userName, setUserName] = useState('');
	const navigate = useNavigate();

	function logout() {
		localStorage.removeItem('AUTH_TOKEN_REACT_COURSE');
		navigate('/login', { replace: true });
	}

	useEffect(() => {
		if (localStorage.getItem('AUTH_TOKEN_REACT_COURSE')?.includes('Bearer')) {
			setIsLogin(true);
		}
		const userName = localStorage.getItem('USER_NAME');
		userName ? setUserName(userName) : setUserName('');
	}, [navigate]);

	return (
		<div className={styles.container}>
			<Logo />
			{isLogin && (
				<div className={styles.loginContainer}>
					<div> {userName}</div>
					<div className={styles.buttonContainer}>
						<Button buttonText={ButtonsName.Logout} onClick={logout} />
					</div>
				</div>
			)}
		</div>
	);
};
