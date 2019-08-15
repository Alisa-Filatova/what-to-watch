import { observable, action, runInAction, onBecomeObserved, computed } from 'mobx';
import { IUserResponse, IUserRequest } from '../types';
import { fetchUser, loginRequest } from '../services';
import storage from '../storage';

const COOKIE_KEY = 'authToken';

class UserStore {
  @observable data: IUserResponse | null;
  @observable fetching: boolean;
  @observable isAuthenticated: boolean;
  @observable cookie: any;

  constructor() {
    this.data = null;
    this.fetching = false;
    this.isAuthenticated = this.getIsAuthenticated;
    this.cookie = storage.get(COOKIE_KEY);
    //
    // onBecomeObserved(this, 'data', () => this.fetch());
  }

  @computed get getIsAuthenticated(): boolean {
    return this.cookie !== null;
  }

  @action async login(user: IUserRequest) {
    try {
      await loginRequest(user);
      this.fetch();
      runInAction(() => {
        storage.set(COOKIE_KEY, 'asd123');
      });
    }
    catch (error) {
      runInAction(() => {
        this.isAuthenticated = false;
        storage.remove(COOKIE_KEY);
        this.cookie = null;
      });
    }
  }

  @action async fetch(): Promise<IUserResponse | null> {
    try {
      this.fetching = true;
      const userData = await fetchUser();
      runInAction(() => {
        this.data = userData;
        this.fetching = false;
      });
      return Promise.resolve(userData);
    } catch (error) {
      runInAction(() => {
        this.data = null;
        this.fetching = false;
      });
      return Promise.reject(error);
    }
  }

}

export default UserStore;
