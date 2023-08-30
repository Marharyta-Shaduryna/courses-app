import { useState } from 'react';

import styles from './Login.module.scss';
import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { API_CONSTANTS } from '../../helpers.ts/api-constants';

type Inputs = {
	Email: string;
	Password: string;
};

export const Login = () => {
	const [emailServerError, setEmailServerError] = useState('');
	const [passwordServerError, setPasswordServerError] = useState('');
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		//email:admin@email.com
		//password:admin123

		// {"name":"Test User","email":"user@email.com","password":"user123","role":"user","id":"f1e5fd00-803f-4cc3-893c-37a88fc330fc"},
		const body = {
			email: data.Email,
			password: data.Password,
		};

		axios
			.post(API_CONSTANTS.login, body)
			.then(function (response) {
				if (response.data.successful) {
					const token = response.data.result;
					localStorage.setItem(
						'AUTH_TOKEN_REACT_COURSE',
						JSON.stringify(token)
					);

					localStorage.setItem('USER', JSON.stringify(response.data.user));
					navigate('/courses', { replace: true });
				}
			})
			.catch(function (error) {
				error.response.data.errors.forEach((err: string) => {
					if (err.includes('email')) setEmailServerError(err);
					if (err.includes('password')) setPasswordServerError(err);
				});
			});
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
						If you have an account you may{' '}
						<Link to='/registration' className={styles.loginLink_bold}>
							Registration
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
