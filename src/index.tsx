import '@webex/components/dist/css/webex-components.css';

import './styles/momentum-ui.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import data from '../data';
import {WebexAvatar, WebexDataProvider, WebexJSONAdapter} from '@webex/components';

const adapter = new WebexJSONAdapter(data); // jsonData represents an opened file

ReactDOM.render(
  <WebexDataProvider adapter={adapter}>
    <WebexAvatar personID="user2" />
  </WebexDataProvider>,
  document.getElementById('root')
);