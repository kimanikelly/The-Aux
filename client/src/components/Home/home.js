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

// ES6 class to define the Home component
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            token: ''

        }

    };

    // componentDidMount() {

    //     axios.get('http://localhost:3000/users')
    //         .then(function (res) {
    //             console.log(res.data.Token)

    //         })
    //         .catch(function (err) {
    //             console.log(err)
    //         })
    // }

    componentDidMount() {

        axios.get('http://localhost:3000/users')
            .then((res) => {
                this.setState({
                    token: res.data.Token,
                    displayName: res.data.DisplayName
                })
                console.log(res.data.DisplayName)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

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
                    <h1>Welcome: {this.state.displayName}</h1>
                </div>
            </React.Fragment>
        )
    }
};

// Exports the Home component
export default Home;