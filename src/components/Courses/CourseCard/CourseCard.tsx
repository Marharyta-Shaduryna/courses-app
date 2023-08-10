import React from 'react';

import styles from './CourseCard.module.scss';
import Button from '../../../common/Button/Button';
import { ButtonsName } from '../../../assets/text/buttonsName';

interface CourseCardProps {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export const CourseCard: React.FC<CourseCardProps> = (props) => {
	return (
		<div className={styles.container}>
			<h1>{props.title}</h1>
			<div className={styles.content}>
				<div className={styles.content__artical}>{props.description}</div>
				<div className={styles.content__courseInfo}>
					<div className={styles.__courseOverview}>
						<p> Authors: {props.authors.map((author) => author + ' ')}</p>
						<p> Duration: {props.duration}</p>
						<p> Created: {props.creationDate}</p>
					</div>
					<div className={styles.buttonsContainer}>
						<Button buttonText={ButtonsName.ShowCourse} />
					</div>
				</div>
			</div>
		</div>
	);
};
