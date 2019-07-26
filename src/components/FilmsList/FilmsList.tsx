import React from 'react';
import FilmCard from '../FilmCard/FilmCard';
import { IFilm } from '../../types';

interface Props {
  films: IFilm[];
}

class FilmsList extends React.PureComponent<Props> {
  render() {
    const { films } = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((film) =>
          <FilmCard film={film} key={film.id} />
        )}
      </div>
    );
  }
}

export default FilmsList;
