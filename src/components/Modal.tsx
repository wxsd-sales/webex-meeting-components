import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input
} from '@momentum-ui/react';

interface Props {
  initWebex: (token:string) => Promise<any>
}

export default (props: Props): JSX.Element => {
  const [showModal, toggleModal] = useState(true);
  const [tokenIsRequired, setTokenIsRequired] = useState({});
  const [token, updateToken] = useState('');
  const [buttonIsDisabled, setButtonDisability] = useState(true);

  const submit = async (event): Promise<any> => {
    event.preventDefault();
    await props.initWebex(token);
    toggleModal(false);
  }

  const handleKeyInput = (event) => {
    if(event.key === 'Enter') submit(event)
  }

  const handleTokenChange = (event) => {
    if(event.target.value === '') {
      setTokenIsRequired({
        message: 'Token is Required',
        type: 'error'
      });

      setButtonDisability(true);
    } else {
      setTokenIsRequired({});
      setButtonDisability(false);
    }
    updateToken(event.target.value);
  }

  return (
    <div>
      <Modal
        applicationId='app'
        size="large"
        onHide={() => toggleModal(false)}
        show={showModal}
        htmlId="modal"
        escapeExits={false}
        focusDialog={false}
        >
        <ModalHeader 
          headerLabel="Webex Authentication"
          showCloseButton={false}
        />
        <ModalBody>
          <Input 
            name="token"
            htmlId="token"
            inputSize="small-5"
            messageArr={[tokenIsRequired]}
            placeholder={"YOUR ACCESS TOKEN"}
            onKeyDown={(event) => {handleKeyInput(event)}}
            onChange={(event) => {handleTokenChange(event)}}
          />
        </ModalBody>
        <ModalFooter>
          <div className="buttons">
            <Button
              onClick={(event) => submit(event)}
              ariaLabel='Authenticate'
              size="small"
              color='blue'
              disabled={buttonIsDisabled}
            >
            Authenticate
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}