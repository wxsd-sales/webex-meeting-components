import React, {useEffect, useState, Component} from 'react';
import {Components, Options, Code} from './';
import {Spinner} from '@momentum-ui/react';
import {WebexDataProvider, WebexInterstitialMeeting, WebexInMeeting} from '@webex/components';
import WebexSDKAdapter from '@webex/sdk-component-adapter';
import useMeetingDestination from '../hooks/useMeetingDestination';
import Webex from 'webex';

export default class App extends Component {
  adapter: any;
  state: any;
  webex: any;
  token: string;

  constructor(props) {
    super(props);
    this.token = "";
    this.state = {
      adapterConnected: false
    }
    this.webex = new Webex({
      config: {
        credentials: {
          client_id: 'Ca9a1906424f85574202b13051a43d7fb865ca4138b6a7aa27c343c7845aed36b',
          redirect_uri: 'https://webexmeeting.ngrok.io',
          scope: 'spark:all spark:kms'
        },
      }
    }); 
  }

  adapterIsConnected() {
    this.setState({adapterConnected: true});
  }

  async initializeAdapter(): Promise<any> {
    console.log('ADAPTER IS INITIATED')
    this.adapter = new WebexSDKAdapter(this.webex);
    await this.adapter.connect();

    this.webex.off('change:canAuthorize', this.initializeAdapter);
  }

  async registerSDK(callback): Promise<any> {
    if(this.webex.canAuthorize) {
      await this.initializeAdapter();
      callback();
    } else {
      this.webex.on('change:canAuthorize', this.initializeAdapter());
    }
  }

  async validateToken(callback) {
    if(localStorage.getItem('token')) {
      await this.registerSDK(callback);
    } else if (this.webex.credentials.supertoken) {
      localStorage.setItem('token', this.webex.credentials.supertoken);
      await this.registerSDK(callback);
    } else {
      await this.webex.authorization.initiateImplicitGrant();
    }
  }

  async requestToken(callback) {
    // Halt till the module is loaded properly
    await this.webex.on('ready', async () => {
      await this.validateToken(callback);
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
            <div className="line"/>
            <div className="right">
              <Components meetingsAdapter={this.adapter.meetingsAdapter}/>
            </div>
          </div>
        </div>
      </WebexDataProvider>) : <Spinner />  
      }
  </div>
  }
}