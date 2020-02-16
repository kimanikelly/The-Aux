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
      <div>
        <Login />
        {/* <Home/> */}
      </div>
    )
  }
}
export default App;
