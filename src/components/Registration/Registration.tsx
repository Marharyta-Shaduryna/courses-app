import { useEffect, useState } from 'react';
import styles from './Registration.module.scss';
import { TEXT_BUNDLE } from '../../assets/text/textbundle';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { ButtonsName } from '../../assets/text/buttonsName';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/asyncActions';
import { AppDispatch } from '../../store';
import { getErrors, getIsAuth } from '../../store/user/selectors';
import { clearErrors } from '../../store/user/actions';

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

	const dispatch = useDispatch<AppDispatch>();
	const registrationErrors = useSelector(getErrors);
	const isAuth = useSelector(getIsAuth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const body = {
			email: data.Email,
			password: data.Password,
			name: data.Name,
		};

		const isCreated = await dispatch(createUser(body));
		if (!registrationErrors.length && isCreated) {
			navigate('/login', { replace: true });
		}
	};

	useEffect(() => {
		if (!isAuth && registrationErrors.length) {
			registrationErrors.forEach((err: string) => {
				if (err.includes('email')) setEmailServerError(err);
				if (err.includes('password')) setPasswordServerError(err);
				if (err.includes('name')) setNameServerError(err);
			});
		}
	}, [isAuth, registrationErrors]);

	const handleLoginRedirect = () => {
		dispatch(clearErrors());
		navigate('/login', { replace: true });
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
						<span
							onClick={handleLoginRedirect}
							className={styles.loginLink_bold}
						>
							Login
						</span>
					</p>
				</form>
			</div>
		</div>
	);
};
