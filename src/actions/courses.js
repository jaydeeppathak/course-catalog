const Axios = require('axios');

const secret = process.env.REACT_APP_SECRET_NAME;

export const getCategories = () => {
  //   const url = 'https://frontend-hiring.appspot.com/all_categories';
  const url = 'https://frontend-hiring.appspot.com/all_courses';
  console.log('secret', secret);
  const params = { secret };
  //   return Axios.get(url, { params })
  return Axios({
    url,
    method: 'GET',
    params,
    headers: {
      'Access-Control-Allow-Origin': '*',
      //   Accept: '*/*',
      Host: 'frontend-hiring.appspot.com',
      //   'Accept-Encoding': 'gzip, deflate, br',
    },
  })
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log('here', error);
    });
};

export const getCourses = () =>
  Axios.get('/user?ID=12345')
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
