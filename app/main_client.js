import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {Posts, FutureRides} from 'collections';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');

Meteor.subscribe('posts');
Meteor.subscribe('FutureRides');

Meteor.startup(() => {
  ReactDOM.render(<App/>, document.getElementById('root'));
});
