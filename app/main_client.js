import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Calendar from './components/Calendar.jsx';
import {Posts, FutureRides, Tasks} from 'collections';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');

Meteor.subscribe('posts');
Meteor.subscribe('FutureRides');
Meteor.subscribe('tasks');

Meteor.startup(function () {

  function checkLoggedIn (ctx, redirect) {
    if (!Meteor.userId()) {
      redirect('/login');
    }
  }

  function redirectIfLoggedIn (ctx, redirect) {
    if (Meteor.userId()) {
      redirect('/');
    }
  }

  FlowRouter.route('/', {
    triggersEnter: [checkLoggedIn],
    action: function() {
      ReactDOM.render(<App />, document.getElementById('root'));
    }
  });

  FlowRouter.route('/calendar', {
    triggersEnter: [checkLoggedIn],
    action: function() {
      ReactDOM.render(<Calendar />, document.getElementById('root'));
    }
  });

  FlowRouter.route('/login', {
    triggersEnter: [redirectIfLoggedIn],
    action: function() {
      ReactDOM.render(<Login />, document.getElementById('root'));
    }
  });

  FlowRouter.initialize();
});