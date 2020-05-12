// Allows for React JSX to be used
// JSX is the React extension for HTML
import React from 'react';

// The react-helmet is an react component to add meta information into react components
// Will be used to set the page title
import { Helmet } from 'react-helmet';

// Loads the CSS stylesheet into login.js
import './style.css';

// Stores the value fo the page title 
var pageTitle = 'The-Aux | Login'

// ES6 class to define the Login component
class Login extends React.Component {
    constructor(props) {
        super(props);

        // // This binding is necessary to make `this` work in the callback
        // this.handleClick = this.handleClick.bind(this)
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

                <a href='http://localhost:3000/auth/spotify'><button type="button" className="btn btn-secondary btn-lg" id='log-in-button'
                    // When this button is clicked the handleClick function is performed
                    // Redirecting to the Spotify authorization page is done by clicking the button
                    onClick={this.handleClick}>
                    <span>Login With Spotify</span>
                </button></a>

                <nav className="navbar fixed-bottom navbar-light bg-light">
                    <h3 className='copyright'>Copyright &copy; 2020</h3>
                </nav>

            </React.Fragment>
        )
    };
};

// Exports the Login component
export default Login;