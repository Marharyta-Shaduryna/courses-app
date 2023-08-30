import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import Logo from './components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmail, getName } from '../../store/user/selectors';
import { AppDispatch } from '../../store';
import { removeUserAction } from '../../store/user/actions';

export const Header = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [name, setName] = useState('');

	const navigate = useNavigate();

	const userEmail = useSelector(getEmail);
	const userName = useSelector(getName);

	const dispatch = useDispatch<AppDispatch>();

	function logout() {
		dispatch(removeUserAction());
		localStorage.removeItem('AUTH_TOKEN_REACT_COURSE');
		setIsLogin(false);
	}

	useEffect(() => {
		if (localStorage.getItem('AUTH_TOKEN_REACT_COURSE')?.includes('Bearer')) {
			setIsLogin(true);
		}
		userEmail && !userEmail.includes('admin') ? setName(userName) : setName('');
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
