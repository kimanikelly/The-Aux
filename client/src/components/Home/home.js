// Allows for React JSX to be used
// JSX is the React extension for HTML
import React from 'react';

import SpotifyPlayer from 'react-spotify-web-playback';

// Allows for HTTP requests on the client side to retrieve/communicate
// With server side data(api-routes and database) and return responses
// Promised based HTTP client
import axios from 'axios';

// The react-helmet is a react component to add meta information into react components
// Will be used to set the page title
import { Helmet } from 'react-helmet';

// Loads and applies the custom css stylesheet
import './style.css';

// Stores the value fo the page title 
var pageTitle = 'The-Aux | Home';

// Loads the spotify-web-api-js NPM module to allow access to the Spotify Web API
var Spotify = require('spotify-web-api-js');

// Initializes the Spotify Web API
var spotifyApi = new Spotify();

// ES6 class to define the Home component
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            token: '',
        };
    };

    // // The componentDidMount function will intitiate the Axios GET request once the Home component is rendered
    // // The API path 'users' will return the logged in users Spotify display name and email address
    async componentDidMount() {

        // Axios GET request 'users' API path in production
        await axios.post('https://the-aux.herokuapp.com/users')

        // Axios GET request 'users' API path in development
        // await axios.post('http://localhost:3000/users')

            // The .then() promise will return the Spotify user data object as the response(res)
            // ES6 arrow function used to perform the promise
            .then((res) => {

                // Sets the displayName state to the logged in users Spotify display name from response(res)
                // Sets the email state to the logged in users Spotify email from response(res)
                this.setState({
                    displayName: res.data.DisplayName,
                    email: res.data.Email,
                    token: res.data.Token,
                });

                sessionStorage.setItem('accessToken', res.data.Token);
                sessionStorage.setItem('displayName', res.data.DisplayName);
            })
            // If an error occurs during the GET request to the 'users' API it will be caught and logged to the console
            .catch(function (err) {
                console.log(err);
            });
    };

    render() {
        return (
            <React.Fragment>

                {/* Sets the page title using the react Helmet component */}
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                {/* The-Aux heading */}
                <nav className="navbar navbar-light bg-light">
                    <h1 className='the-aux'>The-Aux</h1>
                </nav>


                <div id='display-name'>
                    {/* Given the value of the displayName state */}
                    <h1 className='user-info-h1'>Spotify Display Name: {this.state.displayName}</h1>
                </div>


                {/* Email */}
                <div id='email'>
                    {/* Given the value of the email state */}
                    <h1 className='user-info-h1'>Spotify Email: {this.state.email}</h1>
                </div>

                <a href='/'>
                    <button id='log-out-button'>
                        Log out
                    </button>
                </a>

                <div id='player'>
                    <SpotifyPlayer
                        persistDeviceSelection='true'
                        play='true'
                        magnifySliderOnHover='true'
                        autoPlay='true'
                        token={sessionStorage.getItem('accessToken')}
                    />
                </div>

                <nav className="navbar fixed-bottom navbar-light bg-light">
                    <h3 className='copyright'>Copyright &copy; 2020</h3>
                </nav>
            </React.Fragment>
        )
    }
};


// Exports the Home component
export default Home;