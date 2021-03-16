import React from 'react';
import {connect} from 'react-redux';
import {CodeBlock, tomorrow} from "react-code-blocks";
interface Props {
  meetingDestination: string,
  meetingInfoIsDisplayed: boolean,
  muteVideoIsDisplayed: boolean,
  muteAudioIsDisplayed: boolean,
  shareScreenIsDisplayed: boolean,
  isMeetingActive: boolean;
}

const Code = (props: Props): JSX.Element => {
  const controls = props.isMeetingActive ? `[
    ${props.muteVideoIsDisplayed ? `<WebexMeetingControl  key="mute-video" type="mute-video" />,` : ''}
    ${props.muteAudioIsDisplayed ? `<WebexMeetingControl  key="mute-audio" type="mute-audio" />,`: ''}
    ${props.shareScreenIsDisplayed ? `<WebexMeetingControl  key="share-screen" type="share-screen" />,`: ''}
    <WebexMeetingControl  key="leave-meeting" type="leave-meeting" />
  ]` :
  `<WebexMeetingControl key="join-meeting" type="join-meeting" />`
  const code =
  `export default (meetingDestination) => {
    // custom hook to create the meeting using the SDK
    const {ID, remoteVideo} = useMeetingDestination(meetingDestination); // ${props.meetingDestination}
    const controls = ${controls};
    let meetingDisplay;

    // ${props.meetingDestination}
    if (meetingDestination === "email@cisco.com") {
      meetingDisplay = <div>Please input a valid meeting destination!</div>
    } 
    else if (ID === null) {
      meetingDisplay = <div>You have successfully left the meeting!</div>
    } else if (ID === undefined){
      meetingDisplay = <Spinner />;
    } else {
      meetingDisplay = 
        <React.Fragment>
          <div>
            {
            isMeetingActive ? 
            <div>  
              <WebexInMeeting meetingID={ID} /> 
            </div>: 
            <div>
              <WebexMeetingInfo meetingID={ID} />
              <WebexLocalMedia  meetingID={ID} />
            </div>
            }
          </div> 
          <div> {
            <WebexMeetingControls meetingID={ID}>
              {controls}
            </WebexMeetingControls>}
          </div>
      </React.Fragment>
    };

    return meetingDisplay;
  }`;

  return (
    <div className="code">
      <CodeBlock
        text={code}
        language={"javascript"}
        showLineNumbers={false}
        theme={tomorrow}
        />
    </div>
  );
}

const mapStateToProps = state => ({
  isMeetingActive: state.isActive,
  meetingInfoIsDisplayed: state.options.toggleMeetingInfo,
  muteVideoIsDisplayed: state.options.controls.muteVideo,
  muteAudioIsDisplayed: state.options.controls.muteAudio,
  shareScreenIsDisplayed: state.options.controls.shareScreen,
  meetingDestination: state.options.meetingDestination
});

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Code);
