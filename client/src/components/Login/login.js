// Allows for React JSX to be used
// JSX is the React extension for HTML
import React from 'react';

// Allows for HTTP requests on the client side to retrieve/communicate
// With server side data(api-routes and database) and return responses
import axios from 'axios';

// Loads the CSS stylesheet into login.js
import './style.css';

// ES6 class to define the Login component
class Login extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this)
    };

    handleClick(event) {
        axios.post('http://localhost:3000/auth/spotify')
            .then(function (res) {
                console.log(res)
                console.log('The button was clicked')
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="container" id='login-container'>
                <button type="button" className="btn btn-secondary btn-lg" id='log-in-button'
                    onClick={this.handleClick}>
                    Large button
                </button>
            </div>
        )
    }
};

// Exports the Login component
export default Login;