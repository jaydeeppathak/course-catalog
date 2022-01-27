// eslint-disable-next-line no-undef
const Axios = require('axios');

// eslint-disable-next-line no-undef
const secret = process.env.REACT_APP_SECRET_NAME;

export const getCategories = () => {
  const url = 'https://course-catelog.free.beeceptor.com/all_categories';
  const params = { secret };
  return Axios({
    url,
    method: 'GET',
    params,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      console.log('error', error);
    });
};

export const getCourses = () => {
  const url = 'https://course-catelog.free.beeceptor.com/all_courses';
  const params = { secret };
  return Axios({
    url,
    method: 'GET',
    params,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response && response.data;
    })
    .catch((error) => {
      console.log('error', error);
    });
};
