import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { observer, inject } from 'mobx-react';
import { IRouteMatch } from '../../types';
import fetchFilm from '../../actions/fetchFilm';
import FilmsStore from '../../stores/filmsStore';
import UserStore from '../../stores/userStore';

interface StoreProps {
  filmsStore: FilmsStore;
  userStore: UserStore;
}

type FilmProps = StoreProps & RouteComponentProps<IRouteMatch & { filmId: string }>;

@inject('filmsStore', 'userStore')
@observer
class Film extends React.PureComponent<FilmProps> {

  getFilmId = () => this.props.match ? parseInt(this.props.match.params.filmId, 10) : 0;

  fetchFilm() {
    fetchFilm(this.getFilmId()).catch((error) => console.error(error));
  }

  componentDidMount() {
    this.fetchFilm();
  }

  componentDidUpdate(prev: FilmProps) {
    const { match } = this.props;
    if (!match || !prev.match || match.params.filmId === prev.match.params.filmId) return;
    // proceed if filmId has been changed
    this.fetchFilm();
  }

  render() {
    const filmId = this.getFilmId();
    const film = this.props.filmsStore.films.get(filmId);

    return (
      <>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={film.background_image} alt={film.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header user={this.props.userStore.data} />

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{film.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{film.genre}</span>
                  <span className="movie-card__year">{film.released}</span>
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
                  <a href="" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img
                  src={film.poster_image}
                  alt={film.name}
                  width="218"
                  height="327"
                />
              </div>
              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <li className="movie-nav__item movie-nav__item--active">
                      <a href="#" className="movie-nav__link">Overview</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Details</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Reviews</a>
                    </li>
                  </ul>
                </nav>

                <div className="movie-rating">
                  <div className="movie-rating__score">{film.rating}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">Very good</span>
                    <span className="movie-rating__count">{film.scores_count} ratings</span>
                  </p>
                </div>

                <div className="movie-card__text">
                  <p>{film.description}</p>

                  <p
                    className="movie-card__director"><strong>Director: {film.director}</strong>
                  </p>

                  <p
                    className="movie-card__starring"><strong>Starring: {film.starring.join(', ')} and other</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <article className="small-movie-card catalog__movies-card">
                <button className="small-movie-card__play-btn" type="button">Play</button>
                <div className="small-movie-card__image">
                  <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
                       alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"/>
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of
                    Grindelwald</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <button className="small-movie-card__play-btn" type="button">Play</button>
                <div className="small-movie-card__image">
                  <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175"/>
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <button className="small-movie-card__play-btn" type="button">Play</button>
                <div className="small-movie-card__image">
                  <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175"/>
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <button className="small-movie-card__play-btn" type="button">Play</button>
                <div className="small-movie-card__image">
                  <img src="img/aviator.jpg" alt="Aviator" width="280" height="175"/>
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
                </h3>
              </article>
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

export default Film;
