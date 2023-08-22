import React, { useState } from 'react';
import styles from './Registration.module.scss';
import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { API_CONSTANTS } from '../../helpers.ts/api-constants';

type Inputs = {
	Name: string;
	Email: string;
	Password: string;
};

export const Registration = () => {
	const [emailServerError, setEmailServerError] = useState('');
	const [passwordServerError, setPasswordServerError] = useState('');
	const [nameServerError, setNameServerError] = useState('');
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const body = {
			email: data.Email,
			password: data.Password,
			name: data.Name,
		};

		axios
			.post(API_CONSTANTS.registration, body)
			.then(function (response) {
				if (response.data.successful) {
					if (response.data.successful) navigate('/login', { replace: true });
				}
			})
			.catch(function (error) {
				error.response.data.errors.forEach((err: string) => {
					if (err.includes('email')) setEmailServerError(err);
					if (err.includes('password')) setPasswordServerError(err);
					if (err.includes('name')) setNameServerError(err);
				});
			});
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{TEXT_BUNDLE.registration}</h1>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.margin}>
						<Input
							label='Name'
							{...register('Name', { required: true })}
							error={errors.Name}
							serverError={nameServerError}
						/>
					</div>
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
						<Link to='/login' className={styles.loginLink_bold}>
							Login
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
