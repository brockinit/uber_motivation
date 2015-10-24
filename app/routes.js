import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './mainlayout.jsx';
import App from './components/App';

export function createRoutes() {
  FlowRouter.route('/', {
    name: "Home",
    action: function() {
      console.log('Home page');
    }
    // action() {
    //   console.log('hello');
    //   ReactLayout.render(MainLayout, {
    //     content : <App />
    //   });
    // }
  });

  FlowRouter.initialize();
}
