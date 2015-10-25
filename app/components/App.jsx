/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import './App.css';
import BlazeTemplate from './BlazeTemplate';
import {Users, FutureRides} from 'collections';

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
    return window.open('https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=cyqnjSy9pgsE6xMZceAx_l-DTitHhbQ8&scope=profile');
  }

  render() {
    let _Template = typeof (Template) === 'function' ? Template : {
      loginButtons : 'any'
    };

    let userCount = Users.find().fetch().length;

    return (
      <div className='App'>
        <BlazeTemplate template={_Template.loginButtons} />
        <h1>Hello Webpack!</h1>
        <p>There are {userCount} users in the Minimongo  (login to change)</p>
        <button onClick={this.handleAuth} className='autho'>Authorize</button>
      </div>
    );
  }
}
