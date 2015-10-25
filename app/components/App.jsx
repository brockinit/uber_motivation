/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import {Users, FutureRides} from 'collections';
import './App.css';
import './Login.css';

//sanity check function
Meteor.call('sayHello', function(err, res) {
  console.log(res);
});

@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    return {
      users : Users.find().fetch()
    };
  }

  handleAuth() {
    return window.open('https://login.uber.com/oauth/v2/authorize?client_id=eVsjM4L5repfO6oBG3ibyFXZMbeRtx2F&response_type=code&scope=request%20profile');
  }

  render() {
    let _Template = typeof (Template) === 'function' ? Template : {
      loginButtons : 'any'
    };

    return (
      <div className='App'>
        <BlazeTemplate template={_Template.loginButtons} />
        <h1 className='absolute-center'>
          Motivate <br/>
          <small>Make Dat Money, Honey.</small>
        </h1>
      </div>
    );
  }
}
