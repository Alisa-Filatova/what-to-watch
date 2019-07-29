import stores from '../stores';
import { IUserResponse } from '../types';

export default async (): Promise<IUserResponse | null> => {
  if (!stores.userStore.isAuthenticated) {
    return Promise.resolve(null);
  }

  const userData = await stores.userStore.fetch();
  return Promise.resolve(userData);
};
