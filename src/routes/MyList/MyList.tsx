import React from 'react';
import Header from '../../components/Header/Header';
import { IUserResponse, IFilm } from '../../types';
import { observer } from 'mobx-react';
import stores from '../../stores';
import Footer from '../../components/Footer/Footer';
import FilmsList from '../../components/FilmsList/FilmsList';

interface Props {
  user: IUserResponse;
  films: IFilm[];
}

@observer
class MyList extends React.Component<Props> {
  render() {
    const films: IFilm[] = Array.from(stores.filmsStore.favoriteFilms.values());

    return (
      <div className="user-page">
        <Header
          user={stores.userStore.data}
          pageTitle="My List"
          prefix="user-page"
        />
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FilmsList films={films} />
        </section>
        <Footer />
      </div>
    );
  }
}

export default MyList;
