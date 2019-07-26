import stores from '../stores';

export default (filmId: number) =>
  stores.filmsStore.fetchFilm(filmId);
