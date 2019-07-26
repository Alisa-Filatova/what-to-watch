import { api } from '../api';
import { IFilm } from '../types';

export const fetchFilms = async (): Promise<IFilm[]> => {
  const resp = await api.get('/films');
  return resp.data;
};
