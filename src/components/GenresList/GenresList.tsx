import React from 'react';
import GenreItem from '../GenreItem/GenreItem';
import { IFilm } from '../../types';

interface Props {
  currentGenre: string;
  onGenreClick: (genre: string, films: IFilm[] ) => void;
  films: IFilm[];
}

const GENRES = [
  'All genres',
  'Comedies',
  'Crime',
  'Documentary',
  'Dramas',
  'Horror',
  'Kids & Family',
  'Romance',
  'Sci-Fi',
  'Thrillers',
];

const CitiesList: React.FunctionComponent<Props> = ({ onGenreClick, currentGenre, films }) => (
  <div className="catalog__genres-list">
    {GENRES.map((genre) => (
      <GenreItem
        key={genre}
        genre={genre}
        onGenreClick={() => onGenreClick(genre, films)}
        isActive={genre === currentGenre}
      />
    ))}
  </div>
);

export default CitiesList;
