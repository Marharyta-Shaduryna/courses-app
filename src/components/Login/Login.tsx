import { useEffect, useState } from 'react';

import styles from './Login.module.scss';
import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchUser } from '../../store/user/thunk';
import { getErrors, getIsAuth } from '../../store/user/selectors';
import { clearErrors } from '../../store/user/actions';

type Inputs = {
	Email: string;
	Password: string;
};

export const Login = () => {
	const [emailServerError, setEmailServerError] = useState('');
	const [passwordServerError, setPasswordServerError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const loginErrors = useSelector(getErrors);
	const isAuth = useSelector(getIsAuth);

	useEffect(() => {
		if (isAuth) {
			navigate('/courses', { replace: true });
		}

		if (!isAuth && loginErrors) {
			loginErrors.forEach((err: string) => {
				if (err.includes('email')) setEmailServerError(err);
				if (err.includes('password')) setPasswordServerError(err);
			});
		}
	}, [isAuth, loginErrors]);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		//email:admin@email.com
		//password:admin123

		// {"name":"Test User","email":"user@email.com","password":"user123","role":"user","id":"f1e5fd00-803f-4cc3-893c-37a88fc330fc"},
		const body = {
			email: data.Email,
			password: data.Password,
		};

		dispatch(fetchUser(body));
	};

	const handleRegistrationRedirect = () => {
		dispatch(clearErrors());
		navigate('/registration', { replace: true });
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{TEXT_BUNDLE.login}</h1>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.margin}>
						<Input
							label='Email'
							{...register('Email', { required: true })}
							error={errors.Email}
							serverError={emailServerError}
						/>
					</div>
					<div className={styles.margin}>
						<Input
							label='Password'
							{...register('Password', { required: true })}
							error={errors.Password}
							serverError={passwordServerError}
							type='password'
						/>
					</div>
					<div className={styles.margin}>
						<Button buttonText={ButtonsName.Login} />
					</div>
					<p className={styles.loginLink}>
						If you don't have an account you may{' '}
						<span
							onClick={handleRegistrationRedirect}
							className={styles.loginLink_bold}
						>
							Registration
						</span>
					</p>
				</form>
			</div>
		</div>
	);
};
