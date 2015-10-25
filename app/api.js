let config = Meteor.settings;
import OAuth2 from 'oauth';

console.log(OAuth2);
let uberClientID = config.UBER_CLIENT_ID;
let uberClientSecret = config.UBER_CLIENT_SECRET;
let uberServerToken = config.UBER_SERVER_TOKEN;
let serverUrl = config.HOST + ':' + config.PORT;
console.log(serverUrl);

let oauth2 = new OAuth2.OAuth2 (
  uberClientID,
  uberClientSecret,
  'https://login.uber.com/',
  'oauth/authorize',
  'oauth/token',
  null);
console.log(oauth2);

Meteor.methods({
  getAuthorizeUrl() {
    return oauth2.getAuthorizeUrl({
      redirect_uri: serverUrl + '/api/oauth/cb',
      scope: ['profile'],
      state: 'authorizing',
      response_type: 'code'
    });
  },
  getAccessToken(authCode) {
    // var Future = Npm.require('fibers/future');
    // var future = new Future();
    HTTP.call('POST', 'https://login.uber.com/oauth/v2/token', {
      params: {
        client_secret: uberClientSecret,
        client_id: uberClientID,
        grant_type: 'authorization_code',
        redirect_uri: serverUrl + '/api/oauth/cb',
        code: authCode
      }
    }, function(err, result) {
      console.log(result.data);
        if(!err);
        Meteor.users.update(Meteor.userId(), {
          $set: {
            'profile.uberAccessToken': result.data.access_token,
            'profile.token_type': result.data.token_type,
            'profile.expiration': result.data.expires_in,
            'profile.refresh_token': result.data.refresh_token,
            'profile.profile_history': result.data.scope
        }}, null, function(err, numAffected){
          if(err) throw err;
        });
    });
  }


    //   if(!err);
    //   future.return(result);
    // });
    // return future.wait();
    //   var Future = Npm.require('fibers/future');
  //   var future = new Future();
  //   // window.open('https://login.uber.com/oauth/v2/authorize');
  //   HTTP.call('GET', 'https://login.uber.com/oauth/v2/authorize', {
  //     params: {
  //       response_type: 'code',
  //       client_id: 'cyqnjSy9pgsE6xMZceAx_l-DTitHhbQ8'
  //     },
  //   }, function(err, result) {
  //     if(!err) console.log('authorize');
  //     console.log(result);
  //     future.return(result);
  //   });
  //   return future.wait();
  // },
});



