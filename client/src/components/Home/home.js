// Allows for React JSX to be used
// JSX is the React extension for HTML
import React from 'react';

// Allows for HTTP requests on the client side to retrieve/communicate
// With server side data(api-routes and database) and return responses
// Promised based HTTP client
import axios from 'axios';


class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Testing</h1>
            </div>
        )
    }
};

export default Home;