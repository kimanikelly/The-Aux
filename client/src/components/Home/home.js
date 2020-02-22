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

// Loads the react-script-tag module
// Allows for embedding script tags
import ScriptTag from 'react-script-tag';

// Initializes the Spotify Web Player SDK
window.onSpotifyWebPlaybackSDKReady = function () {
    // You can now initialize Spotify.Player and use the SDK
};

// ES6 class to define the Home component
class Home extends React.Component {

    render() {
        return (
            <React.Fragment>
                {/* Installs the Spotify Web Playback SDK */}
                <ScriptTag isHydrating={true} type="text/javascript" src="https://sdk.scdn.co/spotify-player.js" />

                {/* Sets the page title using the react Helmet component */}
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <nav className="navbar navbar-light bg-light">
                    <h1 className='the-aux'>The-Aux</h1>
                </nav>
            </React.Fragment>
        )
    }
};

// Exports the Home component
export default Home;