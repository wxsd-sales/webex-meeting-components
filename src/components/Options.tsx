import React, {Children, useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import useMeetingDestination from '../hooks/useMeetingDestination';
import {WebexMeetingInfo, WebexLocalMedia, WebexInMeeting, WebexMeetingControls, WebexMeetingControl} from '@webex/components';
import {CheckboxGroup, Checkbox, Input, Button} from '@momentum-ui/react';
import * as OPTIONS from '../constants/options';
import {toggleMeetingInfo, toggleMeetingControls, selectMeetingDestination} from '../actions/options';
import {Controls} from '../types';

interface Props {
  toggleMeetingInfo: (value: boolean) => unknown
  toggleMeetingControls: (control: string, value: boolean) => unknown
  selectMeetingDestination: (value: string) => unknown
  meetingInfo: boolean,
  isMeetingActive: boolean,
  controls: Controls<boolean>;
  meetingDestination: string;
}

const Options = (props: Props): JSX.Element => {
  const [destination, setDestination] = useState(props.meetingDestination);
  const [destIsRequired, setDestIsRequired] = useState({});
  const [buttonIsDisabled, setButtonDisability] = useState(true);
  const [meetingInfoOption, enableMeetingInfoOption] = useState(false);
  const disabled = !props.isMeetingActive;

  const toggleCheck = (type: string, control?: string) => {
    switch(type) {
      case OPTIONS.TOGGLE_MEETING_INFO:
        props.toggleMeetingInfo(props.meetingInfo);
        break;
      case OPTIONS.TOGGLE_MEETING_CONTROLS:
        props.toggleMeetingControls(control, props.controls[control])
    }
  }

const submit = (event) => {
  event.preventDefault();

  if(destination === "") {
    setDestIsRequired({
      error: 'Meeting Destination is required!',
      type: 'error'
    });
    setButtonDisability(true);
  } else {
    props.selectMeetingDestination(destination);
    enableMeetingInfoOption(true);
  }
}

const handleDestinationChange = (event) => {
  if(event.target.value !== "") {
    setDestIsRequired({})
    setButtonDisability(false);
  } else {
    setDestIsRequired({
      message: 'Meeting Destination is required!',
      type: 'error'
    });
    setButtonDisability(true);
  }

  setDestination(event.target.value);
}

const handleKeyInput = (event) => {
  if(event.key === 'Enter') submit(event);
}

  return (
    <div className="options">
        <div className="checkBoxes">
          <div>
            <CheckboxGroup name="checkboxGroup1" >
              <Checkbox 
                value="Meeting Info"
                label="Display Meeting Information"
                htmlId="MeetingIno"
                disabled={!meetingInfoOption || props.isMeetingActive}
                onClick={() => {toggleCheck(OPTIONS.TOGGLE_MEETING_INFO)}}
              />
              <Checkbox 
                value="Mute Audio"
                label="Mute Audio"
                htmlId="Mute Audio"
                disabled={disabled}
                onClick={() => {toggleCheck(OPTIONS.TOGGLE_MEETING_CONTROLS, OPTIONS.MUTE_AUDIO)}}
              />
            </CheckboxGroup>
          </div>
          <div>
            <CheckboxGroup name="checkboxGroup2" >
              <Checkbox 
                value="Mute Video"
                label="Mute Video"
                htmlId="Mute Video"
                disabled={disabled}
                onClick={() => {toggleCheck(OPTIONS.TOGGLE_MEETING_CONTROLS, OPTIONS.MUTE_VIDEO)}}
              />
              <Checkbox 
                value="Share Screen"
                label="Share Screen"
                htmlId="ShareScreen"
                disabled={disabled}
                onClick={() => {toggleCheck(OPTIONS.TOGGLE_MEETING_CONTROLS, OPTIONS.SHARE_SCREEN)}}
              />
            </CheckboxGroup >
          </div>
        </div>
        <Input 
          name="meetingDestination"
          label="Meeting Destination"
          htmlId="meetingDestination"
          inputSize="small-5"
          messageArr={[destIsRequired]}
          placeholder={props.meetingDestination}
          onKeyDown={(event) => {handleKeyInput(event)}}
          onChange={(event) => {handleDestinationChange(event)}}
        />
      <Button disabled={buttonIsDisabled} onClick={(event)=>{submit(event)}}>Connect</Button>
    </div>
  );
}

const mapStateToProps = state => ({
  meetingInfo: state.options.toggleMeetingInfo,
  controls: state.options.controls,
  meetingDestination: state.options.meetingDestination,
  isMeetingActive: state.isActive
});

const mapDispatchToProps = {
  toggleMeetingInfo, 
  toggleMeetingControls, 
  selectMeetingDestination
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
