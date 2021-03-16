import {useEffect, useState} from 'react';
import {concatMap} from 'rxjs/operators';

export default (meetingDestination: string, meetingsAdapter: any): any => { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  const emptyMeeting = {
    title: null,
    localAudio: null,
    localVideo: null,
    remoteAudio: null,
    remoteVideo: null,
  };
  const endedMeeting = {
    ...emptyMeeting,
    ID: null,
  }; 

  const [meeting, setMeeting] = useState(emptyMeeting);
  
  useEffect(() => {
    const onMeeting = (newMeeting) => {
      setMeeting({...newMeeting});
    };
    const onError = (error) => {
      setMeeting(emptyMeeting);
      console.log(error);
    };
    const onComplete = () => {
      setMeeting(endedMeeting);
    };

    const subscription = meetingsAdapter
      .createMeeting(meetingDestination)
      .pipe(concatMap(({ID}) => meetingsAdapter.getMeeting(ID)))
      .subscribe(onMeeting, onError, onComplete);

    return () => {
      subscription.unsubscribe();
    };
  }, [meetingDestination]); // eslint-disable-line react-hooks/exhaustive-deps

  return meeting;
};