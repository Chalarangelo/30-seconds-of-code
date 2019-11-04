import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import shell from './shell';
import search from './search';
import navigation from './navigation';

const rootReducer = combineReducers({
  shell,
  search,
  navigation,
});

const persistConfig = {
  key: `30-seconds-app`,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
