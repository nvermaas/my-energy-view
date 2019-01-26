import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class MyDatePicker extends Component {

    handleChoice = (choice) => {
        alert('myDatePicker.handleChoice:' +choice)
        this.props.handleChoice(choice);
    }

    render() {
        return (

            <Button bsStyle="info" bsSize="large" onClick={() => this.props.handleChoice('today')}>Anders</Button>
        );
    }
}

export default MyDatePicker;
