import React, { MouseEventHandler } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	buttonText?: string;
	img?: boolean;
	src?: JSX.Element;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = (props) => (
	<button
		className={`${styles.button} ${props.img ? styles.withImage : ''}`}
		onClick={props.onClick}
	>
		{props.img ? props.src : props.buttonText}
	</button>
);

export default Button;
