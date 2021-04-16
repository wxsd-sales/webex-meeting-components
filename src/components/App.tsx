import React, {Component} from 'react';
import {Components, Options, Code, Modal} from './';
import {Spinner, Button, Icon} from '@momentum-ui/react';
import {WebexDataProvider} from '@webex/components';
import WebexSDKAdapter from '@webex/sdk-component-adapter';
import Webex from 'webex';

interface Props {} // eslint-disable-line @typescript-eslint/no-empty-interface
export default class App extends Component {
  adapter: any;
  state: any;
  webex: any;
  githubPage: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      adapterConnected: false,
      popModal: false,
    }
    this.webex = null;
    this.githubPage = "https://github.com/WXSD-Sales/WebexMeetingDemo";
  }

  async initWebex(token: string): Promise<any> {
    this.webex = new Webex({
      credentials: token
    });

    this.setState({
      popModal: false
    });

    try {
      this.adapter = new WebexSDKAdapter(this.webex);
      await this.adapter.connect();
      this.setState({
        adapterConnected: true,
      });
      localStorage.setItem('token', token);
    } catch (error) {
      this.setState({
        popModal: true
      });
    }
  }

  async componentDidMount(): Promise<any> {
    if (!localStorage.getItem('token')) {
      this.setState({
        popModal: true
      })
    } else {
      await this.initWebex(localStorage.getItem('token'));
    }
  }

  async componentWillUnmount(): Promise<any> {
    // On teardown, disconnect the adapter.
    await this.adapter.disconnect();
  }

  render(): JSX.Element {
    return <div className="app">
    { this.state.popModal ? 
      <Modal initWebex={this.initWebex.bind(this)} /> : this.state.adapterConnected ? (
      <WebexDataProvider adapter={this.adapter} >
        <div className="content">
          <div className="header">
            <h1>Webex Meetings Components </h1>
            <Button circle color="blue" onClick={() => {window.open(this.githubPage, '_blank')}}>
              <Icon name="info_18" />  
            </Button >
          </div>
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