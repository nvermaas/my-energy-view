
import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';


class PresentationButtonBar extends Component {

    handleChoice = (presentation,dataset) => {
        this.props.handleChoice(presentation,dataset);
    }

    render() {

        return (
            <div>

                <ButtonToolbar>


                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="primary" bsSize="large" onClick={() => this.handleChoice('Gas','Gas')}>GAS</Button>&nbsp;

                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('Net Electric Power','Netto')}>POWER</Button>&nbsp;


                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('Consumption','Consumption')}>Consumed</Button>&nbsp;

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('Generation','Generation')}>Generated</Button>&nbsp;

                </ButtonToolbar>
            </div>

        );
    }
}
export default PresentationButtonBar;