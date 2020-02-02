import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Imports the Login component
import Login from './components/Login/login';

class App extends Component {
  render() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}
export default App;
