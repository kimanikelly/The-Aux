// Allows for React JSX to be used
// JSX is the React extension for HTML
import React from 'react';

// Allows for HTTP requests on the client side to retrieve/communicate
// With server side data(api-routes and database) and return responses
// Promised based HTTP client
import axios from 'axios';

// /The react-helmet is an react component to add meta information into react components
// Will be used to set the page title
import { Helmet } from 'react-helmet';

// Stores the value fo the page title 
var pageTitle = 'The-Aux | Home';

class Home extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <div>
                    <h1>Testing</h1>
                </div>
            </React.Fragment>
        )
    }
};

export default Home;