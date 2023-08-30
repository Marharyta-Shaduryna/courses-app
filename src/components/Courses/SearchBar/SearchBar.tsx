import React, { ChangeEvent, useState } from 'react';

import styles from './SearchBar.module.scss';
import { ButtonsName } from '../../../assets/text/buttonsName';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';

export const SearchBar: React.FC<{
	onSearchCourse: (value: string) => void;
}> = ({ onSearchCourse }) => {
	const [inputValue, setInputValue] = useState<string>('');

	const onChangeInput = (payload: ChangeEvent<HTMLInputElement>) => {
		if (payload.target.value === '') onSearchCourse('');
		setInputValue(payload.target.value);
	};

	const onSearch = () => {
		onSearchCourse(inputValue);
	};

	return (
		<div className={styles.container}>
			<div className={styles.input}>
				<Input onChange={onChangeInput} />
			</div>
			<div className={styles.buttonContainer}>
				<Button buttonText={ButtonsName.Search} onClick={onSearch} />
			</div>
		</div>
	);
};
