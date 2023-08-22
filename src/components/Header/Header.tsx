import React, { useState } from 'react';

import styles from './Header.module.scss';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import Logo from './components/Logo/Logo';

export const Header = () => {
	const [isLogin] = useState(false);

	return (
		<div className={styles.container}>
			<Logo />
			<Button buttonText={isLogin ? ButtonsName.Login : ButtonsName.Logout} />
		</div>
	);
};
