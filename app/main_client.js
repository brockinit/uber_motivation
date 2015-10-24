import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import createRoutes from './routes.js';
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
    // action() {
    //   console.log('hello');
    //   ReactLayout.render(MainLayout, {
    //     content : <App />
    //   });
    // }
  });

  FlowRouter.route('/login', {
    action: function() {
      console.log('yup');
    }
  });

  FlowRouter.initialize();
});