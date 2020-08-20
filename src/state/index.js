import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createPersistConfig from './createPersistConfig';
import storage from 'redux-persist/lib/storage';
import shell, { persistConfig as shellConfig } from './shell';
import search, { persistConfig as searchConfig } from './search';
import navigation, {persistConfig as navigationConfig} from './navigation';

const persistConfig = createPersistConfig({
  key: 'root',
  whitelist: [''],
}, storage);

const shellPersistConfig = createPersistConfig(shellConfig, storage);
const searchPersistConfig = createPersistConfig(searchConfig, storage);
const navigationPersistConfig = createPersistConfig(navigationConfig, storage);

export const rootReducer = combineReducers({
  shell: persistReducer(shellPersistConfig, shell),
  search: persistReducer(searchPersistConfig, search),
  navigation: persistReducer(navigationPersistConfig, navigation),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
