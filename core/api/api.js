import axios from 'axios';
import nookies from 'nookies';
// import { canUseDOM, getDomain } from '~/utils';
import { API_ROOT, TIMEOUT } from './config';
import { deleteCookie, removeCookies, setCookie } from 'cookies-next';

const instance = axios.create({
  baseURL: API_ROOT,
  timeout: TIMEOUT,
  headers: {},
});

export function setDefaultHeaders(headers) {
  Object.keys(headers).forEach((key) => {
    instance.defaults.headers.common[key] = headers[key];
  });
}

export function encodeQueryData(data) {
  let ret = [];
  for (let d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error?.response?.status === 401) {
    //   deleteCookie("auth_access_token");
    //   deleteCookie("auth_user_name");
    //   deleteCookie("auth_user_email");
    //   deleteCookie("auth_user_image");
    //   deleteCookie("auth_user_id");
    //   deleteCookie("auth_user_token");
    // }
    // router.push("/login");
  }
);

export default instance;
