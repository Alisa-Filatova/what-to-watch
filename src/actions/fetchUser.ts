import stores from '../stores';
import { IUserResponse } from '../types';

export default async (): Promise<IUserResponse | null> => {
  const userData = await stores.userStore.fetchUser();
  return Promise.resolve(userData);
};
