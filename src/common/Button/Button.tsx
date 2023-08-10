import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	buttonText: string;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	return <button className={styles.button}>{props.buttonText}</button>;
};

export default Button;
