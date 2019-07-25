import React from 'react';
import { Film } from '../../types';

interface Props {
  film: Film;
}

class FilmCard extends React.PureComponent<Props> {
  render() {
    return (
      <article className="small-movie-card catalog__movies-card">
        <button className="small-movie-card__play-btn" type="button">Play</button>
        <div className="small-movie-card__image">
          <img src="img/what-we-do-in-the-shadows.jpg" alt="What We Do in the Shadows" width="280" height="175"/>
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">What We Do in the Shadows</a>
        </h3>
      </article>
    );
  }
}

export default FilmCard;
