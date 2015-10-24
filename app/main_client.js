import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import {Posts} from 'collections';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');

Meteor.subscribe('posts');

Meteor.startup(function () {
  FlowRouter.route('/', {
    action: function() {
      ReactDOM.render(<App />, document.getElementById('root'));
    }
  });

  FlowRouter.route('/login', {
    action: function() {
      ReactDOM.render(<Login />, document.getElementById('root'));
    }
  });

  FlowRouter.initialize();
});