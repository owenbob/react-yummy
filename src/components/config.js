import axios from 'axios';

export const url = 'http://127.0.0.1:5000/';

export const http = axios.create({
    // baseURL: url,
    headers: {
        'x-access-token': sessionStorage.getItem('token')
    },
  });

  export default url;
