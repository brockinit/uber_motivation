/* global Mongo, Meteor */
export const Users = Meteor.users;
export const Posts = new Mongo.Collection('posts');
export const FutureRides = new Meteor.Collection('FutureRides');
export const Tasks = new Mongo.Collection('tasks');