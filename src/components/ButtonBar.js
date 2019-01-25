
import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import MainGraph from './MainGraph';

class ButtonBar extends Component {

    handleChoice = (event) => {
        // alert('ButtonBar.handleChoice:' +event)
        this.props.handleChoice(event);
    }

    render() {

        return (
            <div>
                <ButtonToolbar>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="primary" onClick={() => this.handleChoice('Gas')}>Gas</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" onClick={() => this.handleChoice('Consumption')}>Consumption</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('NetLow')}>Net Low</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('NetHigh')}>Net High</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="primary" onClick={() => this.handleChoice('Generation')}>Generation</Button>.
                </ButtonToolbar>
            </div>

        );
    }
}
export default ButtonBar;