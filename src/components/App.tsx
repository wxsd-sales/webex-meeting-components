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

  constructor(props) {
    super(props);
    this.state = {
      adapterConnected: false
    }
    this.webex = new Webex({
      config: {
        credentials: {
          client_id: process.env.CLIENT_ID,
          redirect_uri: 'https://webexmeeting.ngrok.io',
          scope: 'spark:all spark:kms'
        },
      }
    })
  }

  reInitiateWebex(token: string): void {
    const newToken = token.replace('Bearer ', '');
    this.webex = new Webex({
      credentials: newToken
    });
  }

  adapterIsConnected(): void {
    this.setState({ adapterConnected: true });
  }

  async initializeAdapter(): Promise<any> {
    try {
      this.adapter = new WebexSDKAdapter(this.webex);
      await this.adapter.connect();
      this.webex.off('change:canAuthorize', this.initializeAdapter);
    }
    catch (e) {
      console.log(e)
    }
  }

  async registerSDK(): Promise<any> {
    if (this.webex.canAuthorize) {
      await this.initializeAdapter();
    } else {
      this.webex.on('change:canAuthorize', this.initializeAdapter.bind(this));
    }
  }

  async validateToken(): Promise<any> {
    if (localStorage.getItem('token')) {
      this.reInitiateWebex(localStorage.getItem('token'));
      await this.registerSDK();
      this.adapterIsConnected();
    } else if (this.webex.credentials.supertoken) {
      localStorage.setItem('token', this.webex.credentials.supertoken);
      await this.registerSDK();
      this.adapterIsConnected();
    } else {
      await this.webex.authorization.initiateImplicitGrant();
    }
  }

  async requestToken(callback) {
    await this.webex.on('ready', async () => {
      await this.validateToken();
    });
  }

  async componentDidMount(): Promise<any> {
    await this.requestToken(this.adapterIsConnected.bind(this));
  }

  async componentWillUnmount(): Promise<any> {
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