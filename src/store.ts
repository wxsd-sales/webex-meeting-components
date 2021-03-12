
import {createStore} from 'redux';
import reducers from './reducers';
import State from './types/State';
import {Controls} from './types';
import * as OPTIONS from './constants/options';

const controls = <Controls<boolean>>{};
controls[OPTIONS.MUTE_AUDIO] = false;
controls[OPTIONS.MUTE_VIDEO] = false;
controls[OPTIONS.SHARE_SCREEN] = false;

const initialState = <State> {
  options: {
    controls,
    toggleMeetingInfo: false,
    meetingDestination: 'email@cisco.com'
  },
  isActive: false
};

const configureStore = (initialStore = <State>{}) => createStore(reducers, initialStore);

export default configureStore(initialState);