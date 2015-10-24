import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import {Users, Posts} from 'collections';

@reactMixin.decorate(ReactMeteorData)
export default class Login extends Component {

  getMeteorData() {
    return {
      users: Users.find({}).fetch()
    };
  }

  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
      </div>
    );
  }
}