
import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

class Status extends Component {

    render() {

        return (
            <div>
                <h4>{this.props.presentation} - {this.props.period} - {this.props.resolution}</h4>
            </div>

        );
    }
}
export default Status;