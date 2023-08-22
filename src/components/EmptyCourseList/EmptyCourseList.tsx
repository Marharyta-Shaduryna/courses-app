import React from 'react';
import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import styles from './EmptyCourseList.module.scss';

export const EmptyCourseList = () => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{TEXT_BUNDLE.emptyListTitle}</h3>
			<p className={styles.message}>{TEXT_BUNDLE.emptyCourseListMessage}</p>
			<Button buttonText={ButtonsName.AddNewCourse} />
		</div>
	);
};
