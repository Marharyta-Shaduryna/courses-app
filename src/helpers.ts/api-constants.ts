export const API_CONSTANTS = {
	login: 'http://localhost:4000/login',
	logout: 'http://localhost:4000/logout ',
	registration: 'http://localhost:4000/register',
	courses: 'http://localhost:4000/courses/all',
	authors: 'http://localhost:4000/authors/all',
	currentUser: 'http://localhost:4000/users/me',
	deleteCourse: 'http://localhost:4000/courses',
	addCourse: 'http://localhost:4000/courses/add',
	createAuthor: 'http://localhost:4000/authors/add',
	updateCourse: 'http://localhost:4000/courses',
};
/* /courses/add [POST] (use ADMIN credentials)
/courses/{id} [PUT] (use ADMIN credentials)
/authors/add [POST] (use ADMIN credentials)
/courses/{id} [DELETE] (use ADMIN credentials)
/logout [DELETE]
/users/me [GET] */

/* For fetching requests you should add Authorization header with user's token
Authorization: token */
