
import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import MainGraph from './MainGraph';

class MainScreen extends Component {
    render() {

        return (
            <div>
               <MainGraph data={this.props.data} />

            </div>

        );
    }
}
export default MainScreen;