let config = Meteor.settings;
import OAuth2 from 'oauth';

let uberClientID = config.UBER_CLIENT_ID;
let uberClientSecret = config.UBER_CLIENT_SECRET;
let uberServerToken = config.UBER_SERVER_TOKEN;
let serverUrl = config.HOST;

let oauth2 = new OAuth2.OAuth2 (
  uberClientID,
  uberClientSecret,
  'https://login.uber.com/',
  'oauth/authorize',
  'oauth/token',
  null);

Meteor.methods({
  getAuthorizeUrl() {
    return oauth2.getAuthorizeUrl({
      redirect_uri: serverUrl + '/api/oauth/cb',
      scope: 'profile request',
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
            'profile.scope': 'profile request'
        }}, null, function(err, numAffected){
          if(err) throw err;
        });
    });
  },
  scheduleRides(details) {
    HTTP.call('POST', 'https://sandbox-api.uber.com/v1/requests', {
      'headers' : {
        'Authorization': 'Bearer ' + Meteor.user().profile.uberAccessToken,
        'Content-Type': 'application/json'
      },
      'data' : {
        'product_id' : '821415d8-3bd5-4e27-9604-194e4359a449',
        'start_latitude' : details.start_lat,
        'start_longitude' : details.start_lng,
        'end_latitude' : details.end_lat,
        'end_longitude' : details.end_lng
      },
      'strictSSL' : false
    }, function(err, res) {
      if(err) throw err;
      console.log(res);
      return res;
    });
  }
});

// Meteor.call('getAuthorizeUrl', function(err, result){console.log(result)})
// Meteor.call('getAccessToken', localStorage.auth_token, function(err, result){console.log(result)})