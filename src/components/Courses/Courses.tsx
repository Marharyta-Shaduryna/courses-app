import React from 'react';

import { mockedCoursesList } from '../../assets/mock/mockCourseData';
import { CourseCard } from './CourseCard/CourseCard';

export const Courses = () => {
	return (
		<div className='container'>
			{mockedCoursesList.map((course, index) => {
				return (
					<React.Fragment key={`card-${index}`}>
						<CourseCard {...course} />
					</React.Fragment>
				);
			})}
		</div>
	);
};
