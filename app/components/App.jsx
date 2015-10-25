/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import './App.css';
import BlazeTemplate from './BlazeTemplate';
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

  handleAuth() {
    return window.open('https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=cyqnjSy9pgsE6xMZceAx_l-DTitHhbQ8&scope=profile');
  }

  handleScheduleRide() {
    let details = { date : new Date((this.refs.dateInput).value) };
    console.log(details);
    Meteor.call('scheduleRide', details, function (err, res) {
      if (err) { throw new err; }
      console.log(res);
    });
  }

  render() {
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
      <div className='App'>
        <BlazeTemplate template={_Template.loginButtons} />
        <h1>Hello Webpack!</h1>
        <p>There are {userCount} users in the Minimongo  (login to change)</p>
        <p>There are {postsCount} posts in the Minimongo  (autopublish removed)</p>
        {listPosts}
        <button onClick={this.handleAuth} className='autho'>Authorize</button>
        <input type='date' ref='dateInput'></input>
        <button onClick={this.handleScheduleRide.bind(this)}>Schedule</button>
      </div>
    );
  }
}
