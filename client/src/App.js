import React, { Component } from 'react';
import './App.css';

// Imports the Login component
import Login from './components/Login/login';

// Imports the Home compoent
import Home from './components/Home/home';

// React Router components
// The BrowserRouter component stores all of the <Route> components
// The Route component tells the app which component to display based on the route
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact={true} path='/' render={() => (
          <div className='App'>
            <Login />
          </div>
        )} />

        <Route exact={true} path='https://the-aux.herokuapp.com/home' render={() => (
          <div className='App'>
            <Home />
          </div>
        )} />
      </BrowserRouter>
    );
  };
};

export default App;
