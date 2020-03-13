// Allows for React JSX to be used
// JSX is the React extension for HTML
import React from 'react';

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

// Loads the spotify-web-api-js module to allow access to the Spotify Web API
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
            artist: '',
            track: ''
        };

        this.artistHandleChange = this.artistHandleChange.bind(this);
        this.trackHandleChange = this.trackHandleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    // The componentDidMount function will intitiate the Axios GET request once the Home component is rendered
    // The API path 'users' will return the logged in users Spotify display name and email address
    componentDidMount() {

        // Axios GET request 'users' API path
        axios.get('http://localhost:3000/users')

            // The .then() promise will return the Spotify user data object as the response(res)
            // ES6 arrow function used to perform the promise
            .then((res) => {

                // Sets the displayName state to the logged in users Spotify display name from response(res)
                // Sets the email state to the logged in users Spotify email from response(res)
                this.setState({
                    displayName: res.data.DisplayName,
                    email: res.data.Email
                });
            })
            // If an error occurs during the GET request to the 'users' API it will be caught and logged to the console
            .catch(function (err) {
                console.log(err);
            });
    };

    artistHandleChange(event) {
        this.setState({
            artist: event.target.value
        });
    };

    trackHandleChange(event) {
        this.setState({
            track: event.target.value
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        // The artist variable stores the value of the artist state
        // The value of artist state will change depending on the artist input
        var artist = this.state.artist;

        // The track variable stores the value of the track state
        // The value of track state will change depending on the track input
        var track = this.state.track;

        // Axios GET request 'token' API path
        axios.get('http://localhost:3000/token')
            .then(function (res) {

                // Sets the Spotify access token
                spotifyApi.setAccessToken(res.data.token);

                // The spotifyApi searchTracks function used to search artists and their tracks
                // The artist variable used as an input 
                // The track variable used as an input
                spotifyApi.searchTracks(artist + ':' + track)

                    .then(function (data) {
                        console.log(data);

                    }, function (err) {
                        console.error(err);
                    });
            })
            // If an error occurs during the GET request to the 'token' API it will be caught and logged to the console
            .catch(function (err) {
                console.log(err);
            });

        // Upon form submission the artist and track input fields will clear
        this.setState({
            artist: '',
            track: ''
        });
    };

    render() {
        return (
            <React.Fragment>

                {/* Sets the page title using the react Helmet component */}
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <nav className="navbar navbar-light bg-light">
                    <h1 className='the-aux'>The-Aux</h1>
                </nav>

                <div id='display-header'>
                    <h1>Spotify Display Name: {this.state.displayName}</h1>
                    <h1>Email: {this.state.email}</h1>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Artist:
                        <input type='text'
                            value={this.state.artist}
                            onChange={this.artistHandleChange} />
                    </label>

                    <label>
                        Track:
                        <input type='text'
                            value={this.state.track}
                            onChange={this.trackHandleChange} />
                    </label>
                    <input type='submit' value='submit'></input>
                </form>

            </React.Fragment>
        )
    }
};

// Exports the Home component
export default Home;