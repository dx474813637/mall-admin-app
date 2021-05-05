import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  reg(params) {
    return axios.post('/passport/logon', params);
  },
  forget(params) {
    return axios.post('/passport/findBack', params);
  },
  getCode(params) {
    return axios.post('/passport/getCode', params);
  },
};
