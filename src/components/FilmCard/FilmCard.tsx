import React from 'react';
import { IFilm } from '../../types';
import { Link } from 'react-router-dom';
import { getFilmUrl } from '../../links';

interface Props {
  film: IFilm;
}

class FilmCard extends React.PureComponent<Props> {
  render() {
    const { film } = this.props;
    return (
      <article className="small-movie-card catalog__movies-card">
        <button className="small-movie-card__play-btn" type="button">Play</button>
        <div className="small-movie-card__image">
          <img
            src={film.preview_image}
            alt={film.name}
            width="280"
            height="175"
          />
        </div>
        <h3 className="small-movie-card__title">
          <Link
            className="small-movie-card__link"
            to={getFilmUrl(film.id)}
          >
            {film.name}
          </Link>
        </h3>
      </article>
    );
  }
}

export default FilmCard;
