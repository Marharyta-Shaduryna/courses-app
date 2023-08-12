import React, { useState } from 'react';

import styles from './SearchBar.module.scss';
import { ButtonsName } from '../../../assets/text/buttonsName';
import Button from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';

export const SearchBar: React.FC<{
	onSearchCourse: (value: string) => void;
}> = ({ onSearchCourse }) => {
	const [inputValue, setInputValue] = useState<string>('');

	const onChangeInput = (payload: string) => {
		if (!payload) onSearchCourse(payload);
		setInputValue(payload);
	};

	const onSearch = () => {
		onSearchCourse(inputValue);
	};

	return (
		<div className={styles.container}>
			<label className={styles.input}>
				<Input onChange={onChangeInput} />
			</label>
			<Button buttonText={ButtonsName.Search} onClick={onSearch} />
		</div>
	);
};
