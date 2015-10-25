import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Calendar from './components/Calendar.jsx';
import {Posts, FutureRides, Tasks} from 'collections';
import URL from 'url';

Accounts.ui.config({
  passwordSignupFields : 'USERNAME_ONLY',
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

// http://localhost:3000/api/oauth/cb?state=authorizing&code=j4v7zlvbqSHJmhs7aqAbi7kGOsXvg2
  FlowRouter.route('/api/oauth/cb', {
    // triggersEnter: [function(ctx, redirect) {
    //   redirect('/calendar');
    // }],
    action: function(params, queryParams) {
      localStorage['auth_token'] = queryParams.code;
      console.log(localStorage);
      console.log('Params',params);
        FlowRouter.go('/calendar');
      // console.log('queryParams', queryParams);
      // ReactDOM.render(<Calendar />, document.getElementById('root'));
    },
    // triggersExit: [function(ctx, redirect) {
    //   redirect('/calendar');
    // }],
  });


//   FlowRouter.route('/api/oauth/cb', {
//   // calls just before the action
//   triggersEnter: [trackRouteEntry],
//   action: function() {
//     localStorage['auth_token'] = queryParams.code;
//     console.log(localStorage);
//     console.log('Params',params);
//   },
//   triggersExit: [trackRouteClose]
// });

// function trackRouteEntry(context) {
//   // context is the output of `FlowRouter.current()`
//   Mixpanel.track("/api/oauth/cb", context.queryParams);
// }

// function trackRouteClose(context) {
//   redirect("/calendar");
// }

  FlowRouter.initialize();
});