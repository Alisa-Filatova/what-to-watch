import React from 'react';

interface Props {
  genre: string;
  onGenreClick?: () => void;
  isActive?: boolean;
}

class GenreItem extends React.PureComponent<Props> {

  private handleClick = (event) => {
    event.preventDefault();
    this.props.onGenreClick();
  };

  render() {
    const {genre, isActive} = this.props;

    return (
      <div className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}>
        <a
          onClick={this.handleClick}
          href="#"
          className="catalog__genres-link"
        >
          {genre}
        </a>
      </div>
    );
  }
}

export default GenreItem;
