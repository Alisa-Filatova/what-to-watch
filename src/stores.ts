import FilmsStore from './stores/filmsStore';
import UserStore from './stores/userStore';

export interface IStores {
  filmsStore: FilmsStore;
  userStore: UserStore;
}

export {
  FilmsStore,
  UserStore,
};

export default {
  filmsStore: new FilmsStore(),
  userStore: new UserStore(),
};
