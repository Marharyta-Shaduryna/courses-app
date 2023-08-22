import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Courses } from './components/Courses/Courses';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='login' element={<Login />} />
        <Route path='courses' element={<Courses />} />
        <Route path='courses/add' element={<CreateCourse />} />
        <Route path='courses/:courseId' element={<CourseInfo />} />
        <Route path='registration' element={<Registration />} />
      </Route>
    </Routes>
  </BrowserRouter>
);