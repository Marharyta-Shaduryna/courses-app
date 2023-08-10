import React from 'react';

import { CourseCard } from './CourseCard/CourseCard';
import styles from './Courses.module.scss';
import { Course } from '../../interfaces/courseInterface';
interface CoursesProps {
    courses: Course[];
}

export const Courses: React.FC<CoursesProps> = ({ courses }) => {
    return (
        <div className='container'>
            {courses.map((course, index) => {
                return (
                    <div className={styles.card} key={`card-${index}`}>
                        <CourseCard {...course} />
                    </div>
                );
            })}
        </div>
    );
};
