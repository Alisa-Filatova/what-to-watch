import { api } from '../api';
import { IFilm, IUserResponse, IUserRequest } from '../types';

export const fetchFilms = async (): Promise<IFilm[]> => {
  const resp = await api.get('/films');
  return resp.data;
};

export const fetchPromo = async (): Promise<IFilm> => {
  const resp = await api.get('/films/promo');
  return resp.data;
};

export const loginRequest = async (): Promise<IUserRequest> => {
  const resp = await api.post('/login');
  return resp.data;
};

export const fetchUser = async (): Promise<IUserResponse> => {
  const resp = await api.get('/login');
  return resp.data;
};
