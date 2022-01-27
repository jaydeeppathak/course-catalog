import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { parse, format, differenceInWeeks, isBefore, isAfter, isEqual } from 'date-fns';
import InfoIcon from '../assets/images/info-circle.svg';
import CalendarIcon from '../assets/images/calendar-alt.svg';
import { getCourses } from '../actions/courses';

function CourseCard({ course }) {
  const title = get(course, 'title', '');
  const instuctorName = get(course, 'instructor_name', '');
  const description = get(course, 'description', '');

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const startDate = get(course, 'start_date') ? parse(course.start_date, 'yyyy-MM-dd', today) : '';
  const startDateDisplay = startDate ? format(startDate, 'MMM dd') : '';

  const endDate = get(course, 'end_date') ? parse(course.end_date, 'yyyy-MM-dd', today) : '';
  const endDateDisplay = endDate ? format(endDate, 'MMM dd') : '';
  const diffWeeks = startDate && endDate ? differenceInWeeks(endDate, startDate) : 0;

  let courseOngoingStatus;
  if (isBefore(today, startDate)) {
    courseOngoingStatus = 'Pre-registration';
  } else if (
    (isAfter(today, startDate) || isEqual(startDate, today)) &&
    (isBefore(today, endDate) || isEqual(endDate, today))
  ) {
    courseOngoingStatus = 'Ongoing';
  } else if (isAfter(today, endDate)) {
    courseOngoingStatus = 'Completed';
  }

  const workload = get(course, 'estimated_workload', '');
  return (
    <div className="app__courses__card">
      <div className="app__courses__card__titlerow">
        <div className="app__courses__card__titlerow__bluedot" />
        <div className="app__courses__card__titlerow__div">
          <span className="app__courses__card__titlerow__div__title">{title}</span>
          <span className="app__courses__card__titlerow__div__instructor">{instuctorName}</span>
        </div>
      </div>
      {description && (
        <div className="app__courses__card__descriptionrow">
          <div className="app__courses__card__descriptionrow__div">
            <img
              src={InfoIcon}
              alt="info"
              className="app__courses__card__descriptionrow__div__icon"
            />
            <div
              className="app__courses__card__descriptionrow__div__text"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      )}
      {startDate && (
        <div className="app__courses__card__detailsrow">
          <div className="app__courses__card__detailsrow__div">
            <img
              src={CalendarIcon}
              alt="calendar"
              className="app__courses__card__detailsrow__div__icon"
            />
            <div className="app__courses__card__detailsrow__div__info">
              <span className="app__courses__card__detailsrow__div__info__title">
                {courseOngoingStatus}
              </span>
              <span className="app__courses__card__detailsrow__div__info__title">
                {startDateDisplay} - {endDateDisplay}
              </span>
              <span className="app__courses__card__detailsrow__div__info__duration">
                {diffWeeks} week course, {workload}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CourseList(props) {
  const { search, category } = props;
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    getCourses().then((res) => {
      if (res.status === 200) {
        const newCourses = get(res, 'payload', '') ? JSON.parse(get(res, 'payload', '')) : [];
        setCourses(newCourses);
        if (!search && !category) {
          setFilteredCourses(newCourses);
        } else filterCourses();
      }
    });
  }, []);

  useEffect(() => {
    if (search || category) filterCourses();
  }, [search, category]);

  const CourseCardComponent = React.memo(CourseCard);
  const filterCourses = () => {
    let tempCourses = courses;
    if (!search && category === 'All') {
      setFilteredCourses(tempCourses);
      return;
    }

    if (category && category !== 'All') {
      tempCourses = tempCourses.filter((obj) => obj.category === category);
    }

    if (search) {
      tempCourses = tempCourses.filter((obj) => {
        if (
          get(obj, 'title', '').toLowerCase().includes(search.toLowerCase()) ||
          get(obj, 'instructor_name', '').toLowerCase().includes(search.toLowerCase())
        ) {
          return obj;
        }
      });
    }

    setFilteredCourses(tempCourses);
  };

  return (
    <div className="app__courses">
      <div className="app__courses__header">{courses.length} courses open for registraion</div>
      <div className="app__courses__div">
        {filteredCourses.map((obj, i) => {
          return <CourseCardComponent key={i} course={obj} />;
        })}
      </div>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
CourseList.propTypes = {
  search: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default CourseList;
