/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import './App.css';
import {Users, Posts, FutureRides} from 'collections';

//sanity check function
Meteor.call('sayHello', function(err, res) {
  console.log(res);
});

@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  getMeteorData() {
    return {
      users : Users.find().fetch(),
      posts : Posts.find().fetch()
    };
  }

  render() {

    let userCount = Users.find().fetch().length;
    let postsCount = Posts.find().fetch().length;
    let listPosts = this.data.posts.map((post, index) => {
      return (
        <li>
          {post.name} - {post.desc}
        </li>
      )
    });

    return (
      <div className="Login">
        <h1>Hello Webpack!</h1>
        <p>There are {userCount} users in the Minimongo  (login to change)</p>
        <p>There are {postsCount} posts in the Minimongo  (autopublish removed)</p>
        {listPosts}
      </div>
    );
  }
}
