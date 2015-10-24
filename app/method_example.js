// if you import this on the client, it will be a stub
// if you import this on the server, it will be the real method
// use Meteor.call as normal to consume it.

/* global Meteor */

Meteor.methods({
  //sanity check function
  sayHello() {
    return 'Hello from Meteor method!';
  },
  //method for scheduling uber ride.
  //  needs to be linked to calendar
  addRide (id, details) {
    Synced.Cron.add({
      name : id,
      schedule : function (parser) {
        return parser.recur().on(details.date).fullDate();
      },
      job : function () {
        //function that pings api to request ride (boots/manny)

        // remove id from future rides collection
        FutureRides.remove(id);

        // remove id from synced cron
        SyncedCron.remove(id);

        //return id of scheduled ride
        return id;
      }
    });
  },
  //method for adding ride to FutureRides collection or
  //  calling ride if time has arrived
  scheduleRide(details) {
    if (details.date < new Date()) {
      //function that pings uber api to request ride (boots/manny)
    } else {
      //insert ride infor into FutureRides collection
      var thisId = FutureRides.insert(details);
      addRide(thisId, details);
    }
    return true;
  }
});
