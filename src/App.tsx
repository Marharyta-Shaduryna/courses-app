import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Courses } from './components/Courses/Courses';
import { CourseForm } from './components/CourseForm/CourseForm';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { Registration } from './components/Registration/Registration';
import Layout from './components/Layout/Layout';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='courses' element={<Courses />} />
				<Route
					path='courses/add'
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
				/>
				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
				/>
				<Route path='courses/:courseId' element={<CourseInfo />} />
				<Route path='registration' element={<Registration />} />
			</Routes>
		</Layout>
	);
};

export default App;
