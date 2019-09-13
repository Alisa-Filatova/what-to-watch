import { observable, ObservableMap, action, runInAction, onBecomeObserved, computed } from 'mobx';
import { IFilm } from '../types';
import stFetchStatus from '../types/enums/stFetchStatus';
import { fetchFilms, fetchPromo, fetchFavorites } from '../services';
import fetchFilm from '../actions/fetchFilm';
import stores from '../stores';

class FilmsStore {
  @observable films: ObservableMap<number, IFilm>;
  @observable filmsFetching: stFetchStatus;

  @observable favoriteFilms: ObservableMap<number, IFilm>;
  @observable favoriteFilmsFetching: stFetchStatus;

  @observable promo: IFilm | null;
  @observable currentGenre: string;
  @observable promoFetching: stFetchStatus;

  @observable genres: any;

  constructor() {
    this.films = observable.map({});
    this.filmsFetching = stFetchStatus.None;

    this.favoriteFilms = observable.map({});
    this.favoriteFilmsFetching = stFetchStatus.None;

    this.promo = null;
    this.currentGenre = 'All genres';
    this.promoFetching = stFetchStatus.None;

    this.genres = this.getUniqueGenresFromFilms;

    onBecomeObserved(this, 'films', () => this.fetchFilms());
    onBecomeObserved(this, 'favoriteFilms', () => this.fetchFavoriteFilms());
    onBecomeObserved(this, 'promo', () => this.fetchPromoFilm());
    onBecomeObserved(this, 'genres', () => this.getUniqueGenresFromFilms);
  }

  byId(filmId: number): IFilm | undefined {
    return this.films.get(filmId);
  }

  @computed get getUniqueGenresFromFilms(): IFilm[] {
    if (this.films) {
      const films =  Array.from(this.films.values());
      const sortedFilms = films.map((film) => film).sort((filmA, filmB) => {
        const nameA = filmA.genre.toLowerCase();
        const nameB = filmB.genre.toLowerCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });

      const uniqueFilms = [];

      sortedFilms.forEach((film, i, films) => {
        if (i === 0 || film.genre !== films[i - 1].genre) {
          uniqueFilms.push(film);
        }
      });

      console.log(sortedFilms);

      return uniqueFilms;
    } else {
      return [];
    }
  };

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

  @action changeCurrentGenre (genre: string) {
    this.currentGenre = genre;
  }

  @action filterFilmsByGenre (films: IFilm[], genre: string) {
    films.filter((film: IFilm) => film.genre === genre);
  }
}

export default FilmsStore;
