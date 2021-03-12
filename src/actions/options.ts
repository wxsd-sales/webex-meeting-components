import {
  TOGGLE_MEETING_CONTROLS, 
  TOGGLE_MEETING_INFO, 
  SELECT_MEETING_DESTINATION} from '../constants';

export const toggleMeetingInfo = (value: boolean): any => ({
  type: TOGGLE_MEETING_INFO,
  value
});

export const toggleMeetingControls = (control: string, value: boolean): any => ({
  type: TOGGLE_MEETING_CONTROLS,
  control: control,
  value
});

export const selectMeetingDestination = (value: string): any => ({
  type: SELECT_MEETING_DESTINATION,
  value
});