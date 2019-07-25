import React from 'react';
import FilmCard from '../FilmCard/FilmCard';
import { Film } from '../../types';

interface Props {
  films: Film[];
}

class FilmsList extends React.PureComponent<Props> {
  render() {
    const { films } = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((film) =>
          <FilmCard film={film} />
        )}
      </div>
    );
  }
}

export default FilmsList;
