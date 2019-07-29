import axios from 'axios';
import ResponseStatus from './types/enums/responseStatus';
import Config from './config';

const TIMEOUT = 5000;

export const api = axios.create({
  baseURL: Config.BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true,
});

const onSuccess = (response: any) => response;

const onFail = (error: any) => {
  if (error.response) {
    if (error.response.status === ResponseStatus.FORBIDDEN) {

    } else if (error.response.status >= ResponseStatus.INTERNAL_SERVER_ERROR
      && error.response.status <= ResponseStatus.NETWORK_CONNECT_TIMEOUT
    ) {

    }
  }
};

api.interceptors.response.use(onSuccess, onFail);

