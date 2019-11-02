import { combineReducers } from 'redux';
import shell from './shell';
import search from './search';
import navigation from './navigation';

export default combineReducers({
  shell,
  search,
  navigation,
});
