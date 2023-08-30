import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import Logo from './components/Logo/Logo';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [name, setName] = useState('');
	const navigate = useNavigate();

	function logout() {
		localStorage.removeItem('AUTH_TOKEN_REACT_COURSE');
		navigate('/login', { replace: true });
	}

	useEffect(() => {
		if (localStorage.getItem('AUTH_TOKEN_REACT_COURSE')?.includes('Bearer')) {
			setIsLogin(true);
		}
		const user = localStorage.getItem('USER');
		const { name, email } = JSON.parse(user || '{}');
		name && !email.includes('admin') ? setName(name) : setName('');
	}, [navigate]);

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
