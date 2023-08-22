import React, { MouseEventHandler } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	buttonText: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = (props) => (
	<button className={styles.button} onClick={props.onClick}>
		{props.buttonText}
	</button>
);

export default Button;
