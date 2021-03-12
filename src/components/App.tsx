import React, { useEffect, useState, Component } from 'react';
import { Components, Options, Code } from './';
import { Spinner } from '@momentum-ui/react';
import { WebexDataProvider, WebexInterstitialMeeting, WebexInMeeting } from '@webex/components';
import WebexSDKAdapter from '@webex/sdk-component-adapter';
import useMeetingDestination from '../hooks/useMeetingDestination';
import Webex from 'webex';

export default class App extends Component {
  adapter: any;
  state: any;
  webex: any;
  token: null;

  constructor(props) {
    super(props);
    this.token = null;
    this.state = {
      adapterConnected: false
    };
    this.webex = new Webex({
      // config: {
      // credentials: {
      //   client_id: process.env.CLIENT_ID,
      //   client_secret: process.env.CLIENT_SECRET,
      //   redirect_uri: 'https://f2455d68b1d2.ngrok.io',
      //   scope: 'spark:all spark:kms'
      // }
      // }
    });

    this.adapter = new WebexSDKAdapter(this.webex);
  }

  async componentDidMount() {
    // if(!JSON.parse(localStorage.getItem('token'))){
    //   await this.webex.authorization.initiateImplicitGrant();
    //   localStorage.setItem('token', this.webex.credentials.supertoken);
    // }

    // console.log(JSON.parse(localStorage.getItem('token')));
    // await this.webex.on('ready', () => {
    //   console.log(JSON.parse(localStorage.getItem('token')));
    // })

    await this.adapter.connect();
    // Once adapter connects, set our app state to ready.
    this.setState({ adapterConnected: true });
  }

  async componentWillUnmount() {
    // On teardown, disconnect the adapter.
    await this.adapter.disconnect();
  }

  render(): JSX.Element {
    return <div className="app">
      {
        this.state.adapterConnected ? (
          <WebexDataProvider adapter={this.adapter} >
            <div className="content">
              <h1>Webex Meetings Components </h1>
              <div className="boxes">
                <div className="left">
                  <Options />
                  <Code />
                </div>
                <div className="line" />
                <div className="right">
                  <Components meetingsAdapter={this.adapter.meetingsAdapter} />
                </div>
              </div>
            </div>
          </WebexDataProvider>) : <Spinner />
      }
    </div>
  }
}