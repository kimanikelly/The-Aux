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
        };

        this.search = this.search.bind(this)

    };

    componentDidMount() {

        axios.get('http://localhost:3000/users')
            .then((res) => {
                this.setState({
                    displayName: res.data.DisplayName,
                    email: res.data.Email
                })
            })
            .catch(function (err) {
                console.log(err)
            });
    };

    search() {
        axios.get('http://localhost:3000/token')
            .then(function (res) {
                console.log(res.data.token)
                spotifyApi.setAccessToken(res.data.token);

                // search tracks whose artist's name contains 'Love'
                spotifyApi.searchTracks('tupac:temptations')
                    .then(function (data) {
                        console.log('Search tracks by "Love" in the artist name', data);
                    }, function (err) {
                        console.error(err);
                    });
            })
            .catch(function (err) {
                console.log(err);
            })
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

                <button onClick={this.search}>Search</button>


            </React.Fragment>
        )
    }
};

// Exports the Home component
export default Home;