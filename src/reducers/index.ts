import {combineReducers} from 'redux';
import options from './options';
import isActive from './status';

export default combineReducers({
  options,
  isActive
});