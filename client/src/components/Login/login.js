// Allows for React JSX to be used
// JSX is the React extension for HTML
import React from 'react';

// The react-helmet is an react component to add meta information into react components
// Will be used to set the page title
import { Helmet } from 'react-helmet';

// Allows for HTTP requests on the client side to retrieve/communicate
// With server side data(api-routes and database) and return responses
// Promised based HTTP client
import axios from 'axios';

// Loads the CSS stylesheet into login.js
import './style.css';

// Stores the value fo the page title 
var pageTitle = 'The-Aux | Login'

// ES6 class to define the Login component
class Login extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this)
    };

    // The Event handler responsible for sending the user to the Spotify authorization page
    handleClick(event) {

        // HTTP GET route path
        axios.get('http://localhost:3000/auth/spotify')

            // Callback returns the response object(Spotify authorization data)
            .then(function (res) {

                // Redirects the browser to the Spotify authorization page
                window.location = 'http://localhost:3000/auth/spotify'
            })
            // If there’s a problem with the request, the promise will be rejected with an error object
            .catch(function (err) {
                console.log(err);
            });
    };

    render() {
        return (
            <React.Fragment>

                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <nav className="navbar navbar-light bg-light">
                    <h1 className='the-aux'>The-Aux</h1>
                </nav>

                <button type="button" className="btn btn-secondary btn-lg" id='log-in-button'
                    // When this button is clicked the handleClick function is performed
                    // Redirecting to the Spotify authorization page is done by clicking the button
                    onClick={this.handleClick}>
                    Login to spotify
                </button>

            </React.Fragment>
        )
    };
};

// Exports the Login component
export default Login;