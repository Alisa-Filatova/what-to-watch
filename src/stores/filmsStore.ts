import { observable, ObservableMap, action, runInAction, onBecomeObserved } from 'mobx';
import { IFilm } from '../types';
import stFetchStatus from '../types/enums/stFetchStatus';
import { fetchFilms, fetchPromo, fetchFavorites } from '../services';
import fetchFilm from '../actions/fetchFilm';
import Genres from '../types/enums/filmGenres';

class FilmsStore {
  @observable films: ObservableMap<number, IFilm>;
  @observable filmsFetching: stFetchStatus;

  @observable favoriteFilms: ObservableMap<number, IFilm>;
  @observable favoriteFilmsFetching: stFetchStatus;

  @observable promo: IFilm | null;
  @observable promoFetching: stFetchStatus;

  @observable currentGenre: Genres;

  constructor() {
    this.films = observable.map({});
    this.filmsFetching = stFetchStatus.None;

    this.favoriteFilms = observable.map({});
    this.favoriteFilmsFetching = stFetchStatus.None;

    this.promo = null;
    this.currentGenre = Genres.All;
    this.promoFetching = stFetchStatus.None;

    onBecomeObserved(this, 'films', () => this.fetchFilms());
    onBecomeObserved(this, 'favoriteFilms', () => this.fetchFavoriteFilms());
    onBecomeObserved(this, 'promo', () => this.fetchPromoFilm());
  }

  byId(filmId: number): IFilm | undefined {
    return this.films.get(filmId);
  }

  @action setFilm(film: IFilm) {
    const current = this.byId(film.id);
    this.films.set(film.id, current !== undefined ? {...current, ...film} : film);
  }

  @action async fetchFilm(filmId: number): Promise<IFilm> {
    const [film] = await Promise.all([fetchFilm(filmId)]);
    this.setFilm(film);
    return film;
  }

  @action async fetchFilms() {
    this.filmsFetching = stFetchStatus.Fetching;

    try {
      const films = await fetchFilms();
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

  @action async fetchFavoriteFilms() {
    this.favoriteFilmsFetching = stFetchStatus.Fetching;

    try {
      const films = await fetchFavorites();
      runInAction(() => {
        films.forEach(film => this.favoriteFilms.set(film.id, film));
        this.favoriteFilmsFetching = stFetchStatus.Done;
      });
    } catch (error) {
      runInAction(() => {
        this.favoriteFilmsFetching = stFetchStatus.Error;
        console.error('favorite films not loaded', error);
      });
    }
  }

  @action async fetchPromoFilm() {
    this.promoFetching = stFetchStatus.Fetching;

    try {
      const promoFilm = await fetchPromo();
      runInAction(() => { this.promo = promoFilm; });
      runInAction(() => {
        this.promo = promoFilm;
        this.promoFetching = stFetchStatus.Done;
      });
    } catch (error) {
      runInAction(() => {
        this.promoFetching = stFetchStatus.Error;
        console.error('promo not loaded', error);
      });
    }
  }

  @action changeCurrentGenre (genre: Genres) {
    this.currentGenre = genre;
  }

  @action filterFilmsByGenre (films: IFilm[], genre: Genres) {
    films.filter((film: IFilm) => film.genre === genre);
  }
}

export default FilmsStore;
