import React from 'react';
import App from './components/App.jsx';
import {Posts, FutureRides, Tasks} from './collections';
import {createPosts, createUsers} from './fixtures';
// we don't call this so we're just importing to initialize file
import './method_example';

// these will only run on the sever since we only 'import' them in main_server.js

if (!Posts.find().fetch().length) {
  createPosts();
  createUsers();
}

// smoke test that these are present
Npm.require;
Assets;
require('fs').readFile.call;


Meteor.publish('posts', function () {
  return Posts.find();
});

Meteor.publish('FutureRides', function () {
  return FutureRides.find();
});

Meteor.publish('tasks', function() {
  return Tasks.find();
});

// temporary insecure allowance
Tasks.allow({
  'insert' : function (u, d) {
    return true;
  },
  'update' : function (u, d) {
    return true;
  },
  'remove' : function (u, d) {
    return true;
  }
});

Meteor.startup(() => {

  FutureRides.find().forEach(function (ride) {
    if (ride.date < new Date()) {
      //call function that pings api to request ride
    } else {
      //populate the FutureRides collection on start
      Meteor.call('addRide', ride._id, ride, function (err, res) {
        if (err) { throw err; }
        console.log(res);
      });
    }
  });
  //start the cron
  SyncedCron.start();
});


// console.log('\n\nRunning on server only');
// console.log('There are # posts:', Posts.find().fetch().length);
// console.log('React SSR:', React.renderToString(<App/>));
