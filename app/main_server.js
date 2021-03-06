import React from 'react';
import App from './components/App.jsx';
import {FutureRides, Tasks} from './collections';
// we don't call this so we're just importing to initialize file
import './method_example';
import './api.js';


Meteor.publish('FutureRides', function () {
  return FutureRides.find({ userId : this.userId });
});

// temporary insecure allowance
FutureRides.allow({
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

