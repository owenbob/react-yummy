import axios from 'axios';

export const url = 'https://yummy-api.herokuapp.com/';

export const http = axios.create({
    // baseURL: url,
    headers: {
        'x-access-token': localStorage.getItem('token')
    },
  });

  export default url;
