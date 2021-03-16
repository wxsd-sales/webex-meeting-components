import React from 'react';
import {connect} from 'react-redux';
import useMeetingDestination from '../hooks/useMeetingDestination';
import {WebexMeetingInfo, WebexLocalMedia, WebexInMeeting, WebexMeetingControls, WebexMeetingControl} from '@webex/components';
import {Spinner} from '@momentum-ui/react';
import {toggleMeetingState} from '../actions/status';

interface Props {
  meetingsAdapter: any,
  meetingDestination: string,
  meetingInfoIsDisplayed: boolean,
  muteVideoIsDisplayed: boolean,
  muteAudioIsDisplayed: boolean,
  shareScreenIsDisplayed: boolean,
  toggleMeetingState: (value: boolean) => unknown 
}

const Components = (props: Props): JSX.Element => {
  const {ID, remoteVideo} = useMeetingDestination(props.meetingDestination, props.meetingsAdapter);
  const isMeetingActive = remoteVideo !== null ? true : false;
  const controls = isMeetingActive ? [
    props.muteVideoIsDisplayed && <WebexMeetingControl  key="mute-video" type="mute-video" />,
    props.muteAudioIsDisplayed && <WebexMeetingControl  key="mute-audio" type="mute-audio" />,
    props.shareScreenIsDisplayed && <WebexMeetingControl  key="share-screen" type="share-screen" />,
    <WebexMeetingControl  key="leave-meeting" type="leave-meeting" />
  ] : 
      <WebexMeetingControl key="join-meeting" type="join-meeting" />
  let meetingExp;

  if(isMeetingActive) {
    props.toggleMeetingState(true);
  } else {
    props.toggleMeetingState(false);
  }


  if(props.meetingDestination === "email@cisco.com") {
    meetingExp = <div>Please input a valid meeting destination!</div>
  }
  else if(ID === null) {
    meetingExp = <div>You have successfully left the meeting</div>
  } else if(ID === undefined){
    meetingExp = <Spinner />;
  } 
  else{
    meetingExp = 
    <React.Fragment>
      <div className="videos">{
        isMeetingActive ? 
        <div className="inMeeting">  <WebexInMeeting meetingID={ID} /> </div>: 
        <div className="interstitial">
          {props.meetingInfoIsDisplayed && <WebexMeetingInfo className="interstitial-meeting-info" meetingID={ID} />}
          <WebexLocalMedia className="interstitial-media" meetingID={ID} />
        </div>
      }</div> 
      <div className="controls">{<WebexMeetingControls meetingID={ID}>{controls}</WebexMeetingControls>}</div>
    </React.Fragment>
  }
  return <div className="meeting">
    {meetingExp}
  </div> ;
}

const mapStateToProps = state => ({
  meetingInfoIsDisplayed: state.options.toggleMeetingInfo,
  muteVideoIsDisplayed: state.options.controls.muteVideo,
  muteAudioIsDisplayed: state.options.controls.muteAudio,
  shareScreenIsDisplayed: state.options.controls.shareScreen,
  meetingDestination: state.options.meetingDestination
});

const mapDispatchToProps = {
  toggleMeetingState,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Components);
