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

axios({
    method: 'get',
    baseURL: 'https://api.spotify.com/v1/me',
    headers: {
        Authorization: 'Bearer BQBwNM_Zf_p0a4STiacbg18HJXuKU9OTMyn1UBU4w7yBFZqw_U2xUktbVIwk8adytEQ3jdEaQEJ496AvDaVUwgicxwKIYPMXwe1TKR4eUviCkmYmekR2U2CO5F6WQCyQKmfu7S20P1ZMtKy7CqgEcZtwszitUQDTtl0'
    }
})
    .then(function (res) {
        console.log(res.data)
    })
    .catch(function (err) {
        console.log(err)
    })
// ES6 class to define the Home component
class Home extends React.Component {

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

            </React.Fragment>
        )
    }
};

// Exports the Home component
export default Home;