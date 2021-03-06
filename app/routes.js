import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Calendar from './components/Calendar.jsx';


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

  Accounts.onLogin(function() {
    FlowRouter.go('/calendar');
  });

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
      ReactDOM.render(<App />, document.getElementById('root'));
    }
  });

  // http://localhost:3000/api/oauth/cb?state=authorizing&code=j4v7zlvbqSHJmhs7aqAbi7kGOsXvg2
  FlowRouter.route('/api/oauth/cb', {
    // triggersEnter: [function(ctx, redirect) {
    //   redirect('/calendar');
    // }],
    action: function(params, queryParams) {
      // Meteor.users.update(Meteor.userId(), {
      //   $set: {
      //     'profile.uberAccessToken': queryParams.code
      // }}, null, function(err, numAffected){
      //   if(err) throw err;
      //   FlowRouter.go('/calendar');
      // });
      localStorage['auth_token'] = queryParams.code;
      console.log(localStorage);
      console.log('Params',params);
      Meteor.call('getAccessToken', localStorage.auth_token, function(err, result){
        FlowRouter.go('/calendar');
      });
      // console.log('queryParams', queryParams);
      // ReactDOM.render(<Calendar />, document.getElementById('root'));
    },
    // triggersExit: [function(ctx, redirect) {
    //   redirect('/calendar');
    // }],
  });
  FlowRouter.initialize();
});
