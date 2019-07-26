import { api } from '../api';
import { IFilm } from '../types';

export const fetchFilms = async (): Promise<IFilm[]> => {
  const resp = await api.get('/films');
  return resp.data;
};

export const fetchPromo = async (): Promise<IFilm> => {
  const resp = await api.get('/films/promo');
  return resp.data;
};
