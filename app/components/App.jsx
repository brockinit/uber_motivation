/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import BlazeTemplate from './BlazeTemplate';
import {Users, Posts, FutureRides} from 'collections';
import './App.css';

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
    // Template does not suppor server side
    let _Template = typeof (Template) === 'function' ? Template : {
      loginButtons : 'any'
    };
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
      <div className="App">
        <BlazeTemplate template={_Template.loginButtons} />
        <h1>Hello Webpack!</h1>
        <p>There are {userCount} users in the Minimongo  (login to change)</p>
        <p>There are {postsCount} posts in the Minimongo  (autopublish removed)</p>
        {listPosts}
      </div>
    );
  }
}
