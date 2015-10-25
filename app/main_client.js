import React from 'react';
import ReactDOM from 'react-dom';
import {FutureRides, Tasks} from 'collections';
import './routes.js';

Accounts.ui.config({
  passwordSignupFields : 'USERNAME_ONLY',
});

console.log('Running on client only');

Meteor.subscribe('FutureRides');
Meteor.subscribe('tasks');

