import React from 'react';
import { observer } from 'mobx-react';
import stores from '../../stores';
import FilmsList from '../../components/FilmsList/FilmsList';
import GenresList from '../../components/GenresList/GenresList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import { IFilm } from '../../types';
import stFetchStatus from '../../types/enums/stFetchStatus';

interface State {
  currentGenre: string;
  films: IFilm[];
}

@observer
class Main extends React.PureComponent<State> {

  state: State = {
    currentGenre: '',
    films: Array.from(stores.filmsStore.films.values()),
  };

  componentDidMount(): void {
    this.setState({ currentGenre: stores.filmsStore.currentGenre });
  }

  onGenreTabClick = (genre: string, films: IFilm[]) => {
    this.setState( { currentGenre: genre, films: films } );
    stores.filmsStore.changeCurrentGenre(genre);
  };

  render() {
    const films: IFilm[] = Array.from(stores.filmsStore.films.values());
    const filteredFilms = films.filter((film) => film.genre === this.state.currentGenre);
    const promoFilm = stores.filmsStore.promo;
    const fetching = stores.filmsStore.filmsFetching;

    return (
      <>
        {promoFilm &&
          <section
            className="movie-card"
            style={{background: promoFilm.background_color}}
          >
              <>
                <div className="movie-card__bg">
                  <img
                    src={promoFilm.background_image}
                    alt={promoFilm.name}
                  />
                  {/*<VideoPlayer*/}
                  {/*  previewImageSrc={promoFilm.preview_image}*/}
                  {/*  videoSrc={promoFilm.preview_video_link}*/}
                  {/*/>*/}
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <Header user={stores.userStore.data} />

                <div className="movie-card__wrap">
                  <div className="movie-card__info">
                    <div
                      className="movie-card__poster"
                      style={
                        {
                          backgroundColor: promoFilm.background_color,
                        }
                      }
                    >
                      <img
                        src={promoFilm.poster_image}
                        alt={promoFilm.name}
                        width="218"
                        height="327"
                      />
                    </div>

                    <div className="movie-card__desc">
                      <h2 className="movie-card__title">{promoFilm.name}</h2>
                      <p className="movie-card__meta">
                        <span className="movie-card__genre">{promoFilm.genre}</span>
                        <span className="movie-card__year">{promoFilm.released}</span>
                      </p>

                    <div className="movie-card__buttons">
                      <button className="btn btn--play movie-card__button" type="button">
                        <svg viewBox="0 0 19 19" width="19" height="19">
                          <use xlinkHref="#play-s"/>
                        </svg>
                        <span>Play</span>
                      </button>
                      <button className="btn btn--list movie-card__button" type="button">
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"/>
                        </svg>
                        <span>My list</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </section>
        }

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenresList
              currentGenre={this.state.currentGenre}
              films={films}
              onGenreClick={this.onGenreTabClick}
            />
            {fetching === stFetchStatus.Fetching && <Loader />}
            {fetching === stFetchStatus.Done && <FilmsList films={filteredFilms} />}
            {fetching === stFetchStatus.Error && <div>Oops! Something went wrong!</div>}
            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

export default Main;
