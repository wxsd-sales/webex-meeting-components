import {Action} from '../types';
import {TOGGLE_MEETING_STATE} from '../constants';

export default (state= false, action: Action): boolean => {
  switch(action.type) {
    case TOGGLE_MEETING_STATE:
      return action.value;
    default:
      return state;
  }
}