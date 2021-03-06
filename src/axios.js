import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err),
);

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.data.status === 'fail') {
      return Promise.reject(response.data.msg);
    }
    return response.data;
  },
  (error) => Promise.reject(error),
);

export default instance;
