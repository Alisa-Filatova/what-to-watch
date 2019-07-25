import axios from 'axios';
import ResponseStatus from './types/enums/responseStatus';

const TIMEOUT = 5000;
const BASE_URL = 'https://es31-server.appspot.com/wtw';

export const createAPI = (onLoginFail: any, onServerError: any) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response: any) => response;

  const onFail = (error: any) => {
    if (error.response) {
      if (error.response.status === ResponseStatus.FORBIDDEN) {
        onLoginFail();
      } else if (error.response.status >= ResponseStatus.INTERNAL_SERVER_ERROR
        && error.response.status <= ResponseStatus.NETWORK_CONNECT_TIMEOUT
      ) {
        onServerError();
      }
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
