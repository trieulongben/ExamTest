import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'appStorage',
  encryptionKey: 'hunter2',
});

export enum ELocalStorageKey {
  SESSION_TOKEN = 'session_token',
}
