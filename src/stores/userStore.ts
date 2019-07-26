import { observable, action, runInAction } from 'mobx';
import { IUserResponse } from '../types';
import { fetchUser } from '../services'

class UserStore {
  @observable data: IUserResponse | null;
  @observable fetching: boolean;
  @observable isAuthenticated: boolean;

  constructor() {
    this.data = null;
    this.fetching = false;
    this.isAuthenticated = false;
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
