export type CourseType = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

export type CoursesState = {
	courses: CourseType[];
	error?: Error | null;
};
