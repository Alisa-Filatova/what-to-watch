import FilmsStore from './stores/filmsStore';

export interface IStores {
  filmsStore: FilmsStore;
}

export {
  FilmsStore,
};

export default {
  filmsStore: new FilmsStore(),
};
