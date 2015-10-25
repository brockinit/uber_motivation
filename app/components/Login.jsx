import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import {Users, FutureRides} from 'collections';

@reactMixin.decorate(ReactMeteorData)
export default class Login extends Component {

  getMeteorData() {
    return {
      users : Users.find().fetch()
    };
  }

  render() {
    // Template does not suppor server side
    let _Template = typeof (Template) === 'function' ? Template : {
      loginButtons : 'any'
    };
    let userCount = Users.find().fetch().length;

    return (
      <div className="Login">
        <BlazeTemplate template={_Template.loginButtons} />
        <h1>Hello Webpack!</h1>
        <p>There are {userCount} users in the Minimongo  (login to change)</p>
      </div>
    );
  }
}
