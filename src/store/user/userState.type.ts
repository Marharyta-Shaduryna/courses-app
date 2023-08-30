export type UserType = {
	email: string;
	name: string;
	isAuth: boolean;
	token: string;
	errors: string[];
};

export type UserState = {
	user: UserType;
};
