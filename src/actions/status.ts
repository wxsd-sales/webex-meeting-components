import {TOGGLE_MEETING_STATE} from '../constants';

export const toggleMeetingState = (value: boolean): any => ({
  type: TOGGLE_MEETING_STATE,
  value
})