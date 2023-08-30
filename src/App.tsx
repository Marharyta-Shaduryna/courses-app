import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchCourses } from './store/asyncActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { Login } from './components/Login/Login';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { Registration } from './components/Registration/Registration';
import Layout from './components/Layout/Layout';

const App = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path='login' element={<Login />} />
					<Route path='courses' element={<Courses />} />
					<Route path='courses/add' element={<CreateCourse />} />
					<Route path='courses/:courseId/edit' element={<CreateCourse />} />
					<Route path='courses/:courseId' element={<CourseInfo />} />
					<Route path='registration' element={<Registration />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
