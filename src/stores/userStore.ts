import { observable, action, runInAction, computed, onBecomeObserved } from 'mobx';
import { IUserResponse, IUserRequest } from '../types';
import { fetchUser, loginRequest } from '../services';

class UserStore {
  @observable data: IUserResponse | null;
  @observable fetching: boolean;
  @observable isAuthenticated: boolean;

  constructor() {
    this.data = null;
    this.fetching = false;
    this.isAuthenticated = this.checkAuthenticated;

    onBecomeObserved(this, 'user', () => this.fetchUser());
  }

  @computed get user(): IUserResponse | null {
    return this.data;
  }

  @computed get checkAuthenticated(): boolean {
    return !!this.data;
  }

  @action async login(user: IUserRequest) {
    try {
      this.fetching = true;
      await loginRequest(user);
      runInAction(() => {
        this.fetching = false;
      });
    } catch (error) {
      runInAction(() => {
        this.data = null;
        this.fetching = false;
      });
    }
  }

  @action async fetchUser(): Promise<IUserResponse | null> {
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
