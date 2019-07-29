import { observable, action, runInAction, computed } from 'mobx';
import { IUserResponse, IUserRequest } from '../types';
import { fetchUser, loginRequest } from '../services';
import Cookie from 'mobx-cookie';

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
    this.cookie = null;
  }

  @computed get authToken() {
    return this.cookie.value;
  }

  @action setAuthToken = value => {
    this.cookie.set(value);
  };

  @action unsetAuthToken = () => {
    this.cookie.remove();
  };

  @computed get getIsAuthenticated(): boolean {
    return this.cookie !== null;
  }

  @action async login(user: IUserRequest) {
    try {
      await loginRequest(user);
      this.fetch();
      runInAction(() => {
        this.isAuthenticated = true;
        this.cookie = new Cookie(COOKIE_KEY);
      });
    }
    catch (error) {
      runInAction(() => {
        this.isAuthenticated = false;
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
        this.isAuthenticated = true;
      });
      return Promise.resolve(userData);
    } catch (error) {
      runInAction(() => {
        this.data = null;
        this.fetching = false;
        this.isAuthenticated = false;
      });
      return Promise.reject(error);
    }
  }

}

export default UserStore;
