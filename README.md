# MOTIVATE
_______
Uber Hackathon App. Will call Uber API and request ride for users after they establish pre-scheduled commitments.
Features:
- Uber API
- Meteor
- React
- ES6
- Webpack
- FlowRouter
- SyncChron
- Google Maps API
- DHX calendar

## Utilizes Synced Cron
Establishes time commitmments and signals Uber ride when commitment has arrived.

## Uber API Connection
Hackathon required we use the some instance of the Uber API. Our approach was to use Meteor as our framework, React as the javascript library that pulled from ES6, Webpack to manage modules, flow router to handle routes, sync-chron to tackle chron jobs, google maps api for geo location, and DHX for calendar interface.

## Easy to Use Reservation System
Motivate web app pushes unique uber request rides based on user prefrences. Allow users to input location, date and time for request.
Upon scheduling their ride, Uber will notify the user. Once that scheduled plan has reached its point of expiration, a POST request will be made to send a cab.

## Team aka Purple Mongoose
- Manny Pilande
- Alex Anich
- Brock Lanoza
- Bryan Butteling
