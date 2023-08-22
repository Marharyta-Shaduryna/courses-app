import React, { ChangeEvent } from 'react';
import styles from './Input.module.scss';
import { TEXT_BUNDLE } from '../../assets/text/textbundle';

const Input: React.FC<{ onChange: (value: string) => void }> = ({
	onChange,
}) => {
	const onFieldChange = (value: ChangeEvent<HTMLInputElement>) =>
		onChange(value.target.value);
	return (
		<input
			placeholder={TEXT_BUNDLE.inputText}
			className={styles.input}
			onChange={(value) => {
				onFieldChange(value);
			}}
		/>
	);
};

export default Input;
