import { observable, ObservableMap, action, runInAction, onBecomeObserved } from 'mobx';
import { IFilm } from '../types';
import stFetchStatus from '../types/enums/stFetchStatus';
import { fetchFilms } from '../services';
import fetchFilm from '../actions/fetchFilm';

class FilmsStore {
  @observable films: ObservableMap<number, IFilm>;
  @observable filmsFetching: stFetchStatus;

  constructor() {
    this.films = observable.map({});
    this.filmsFetching = stFetchStatus.None;

    onBecomeObserved(this, 'films', () => this.fetch());
  }

  byId(filmId: number): IFilm | undefined {
    return this.films.get(filmId);
  }

  @action setFilm(film: IFilm) {
    const current = this.byId(film.id);
    this.films.set(film.id, current !== undefined ? { ...current, ...film } : film);
  }

  @action async fetchFilm(filmId: number): Promise<IFilm> {
    const [film] = await Promise.all([
      fetchFilm(filmId),
    ]);
    this.setFilm(film);
    return film;
  }

  @action async fetch() {
    this.filmsFetching = stFetchStatus.Fetching;

    try {
      const films = await fetchFilms();
      console.log(films);
      runInAction(() => {
        films.forEach(film => this.films.set(film.id, film));
        this.filmsFetching = stFetchStatus.Done;
      });
    } catch (error) {
      runInAction(() => {
        this.filmsFetching = stFetchStatus.Error;
        console.error('films not loaded', error);
      });
    }
  }
}

export default FilmsStore;