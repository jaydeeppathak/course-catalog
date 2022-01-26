import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { apiCourses } from './constants';

function CourseCard({ course }) {
	console.log('course', course);
	const title = get(course, 'title', '');
	return (
		<div className="app__courses__card">
			<div className="app__courses__card__titlerow">
				<div className="app__courses__card__titlerow__bluedot" />
				<div className="app__courses__card__titlerow__div">
					<span className="app__courses__card__titlerow__div__title">{title}</span>
					{/* <span></span> */}
				</div>
			</div>
		</div>
	);
}

function CourseList() {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const newCourses = get(apiCourses, 'payload', '') ? JSON.parse(apiCourses.payload) : [];
		setCourses(newCourses);
	}, []);

	return (
		<div className="app__courses">
			<div className="app__courses__header">{courses.length} courses open for registraion</div>
			<div className="app__courses__div">
				{courses.map((obj, i) => {
					return <CourseCard key={i} course={obj} />;
				})}
			</div>
		</div>
	);
}

CourseCard.propTypes = {
	course: PropTypes.object.isRequired,
};

export default CourseList;
