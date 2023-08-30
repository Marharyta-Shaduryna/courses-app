import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import styles from './EmptyCourseList.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEmail, getIsAuth } from '../../store/user/selectors';

export const EmptyCourseList = () => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const navigate = useNavigate();

	const email = useSelector(getEmail);
	const isAuth = useSelector(getIsAuth);

	useEffect(() => {
		if (!isAuth) return;
		email.includes('admin') ? setIsAdmin(true) : setIsAdmin(false);
	}, [isAuth, email]);

	const addNewCourse = () => {
		if (isAdmin) navigate('/courses/add', { replace: true });
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{TEXT_BUNDLE.emptyListTitle}</h3>
			<p className={styles.message}>{TEXT_BUNDLE.emptyCourseListMessage}</p>
			{isAdmin ? (
				<div className={styles.buttonContainer}>
					<Button
						buttonText={ButtonsName.AddNewCourse}
						onClick={addNewCourse}
					/>
				</div>
			) : (
				<p className={styles.message}>{TEXT_BUNDLE.noPermissionsMessage}</p>
			)}
		</div>
	);
};
