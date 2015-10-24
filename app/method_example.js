// if you import this on the client, it will be a stub
// if you import this on the server, it will be the real method
// use Meteor.call as normal to consume it.
/* global Meteor */

Meteor.methods({
  sayHello() {
    return 'Hello from Meteor method!';
  },
  uberAutho() {
    var Future = Npm.require('fibers/future');
    var future = new Future();

    HTTP.call('GET', 'https://login.uber.com/oauth/v2/authorize', {
      params: {
        response_type: 'code',
        client_id: 'cyqnjSy9pgsE6xMZceAx_l-DTitHhbQ8'
      },
    }, function(err, result) {
      if(!err) console.log('authorize');
      console.log(result);
      future.return(result);
    });
    return future.wait();
  }
});

//test check to connect to UBER server
// HTTP.call('GET', 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823', {
//   headers: {
//     Authorization: 'Token 6-sTkIwaal83UJYvt3ZQWfYpGANIEVaPmirW7W6y',
//   },
// }, function(err, result) {
//   if(!err) console.log('Connected to server');
//   console.log(result);
// });

//run get request on the server using public key
