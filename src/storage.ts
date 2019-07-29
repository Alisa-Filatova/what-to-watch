import Config from './config';
import store from 'store';

const storage = {
  get: (key: string, defValue?: any): any => store.get(Config.STORAGE_PREFIX + key, defValue),
  set: (key: string, value: any): void => store.set(Config.STORAGE_PREFIX + key, value),
  remove: (key: string): void => store.remove(Config.STORAGE_PREFIX + key),
};

export default storage;
