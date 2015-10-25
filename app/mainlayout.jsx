import React, {Component} from 'react';

export default class MainLayout extends Component {
  render() {
    return (
      <div>
        <header><h1>Kadira Blog</h1></header>
        <main>{this.props.content}</main>
        <footer>We love Meteor</footer>
      </div>
    );
  }
}