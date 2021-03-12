import {
  TOGGLE_MEETING_CONTROLS, 
  TOGGLE_MEETING_INFO, 
  SELECT_MEETING_DESTINATION} from '../constants';
import {Action, Options} from '../types';

export default  (options= <Options>{}, action: Action): Options => {
  switch(action.type) {
    case TOGGLE_MEETING_INFO:
      return {
        ...options,
        toggleMeetingInfo: !action.value
      }
    case TOGGLE_MEETING_CONTROLS:
      options.controls[action.control] = !options.controls[action.control];
      
      return {
        ...options,
        controls: {...options.controls}
      }
    case SELECT_MEETING_DESTINATION:
      return {
        ...options,
        meetingDestination: action.value
      }
    default:
      return options;
  }
}