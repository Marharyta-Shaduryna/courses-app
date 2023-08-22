import React from 'react';
import styles from './Input.module.scss';
import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import { FieldError } from 'react-hook-form';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: FieldError;
	serverError?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { label, error, serverError, ...otherProps } = props;

	return (
		<>
			<label>
				{label && `${label}:`}
				<input
					placeholder={TEXT_BUNDLE.inputText}
					className={`${styles.input} ${
						error || serverError ? styles.errorInput : ''
					}`}
					ref={ref}
					onChange={(data) => props.onChange && props.onChange(data)}
					{...otherProps}
				/>
			</label>
			{error && <span className={styles.error}>{`${label} is required`}</span>}
			{serverError && <span className={styles.error}>{`${serverError}`}</span>}
		</>
	);
});

export default Input;
