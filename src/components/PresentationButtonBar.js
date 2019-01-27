
import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';


class PresentationButtonBar extends Component {

    handleChoice = (presentation,dataset) => {
        this.props.handleChoice(presentation,dataset);
    }

    render() {

        return (
            <div>
                Overzicht
                <ButtonToolbar>


                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="primary" bsSize="large" onClick={() => this.handleChoice('Gas','Gas')}>GAS</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('Netto Stroom','Netto')}>Netto STROOM</Button>.
                </ButtonToolbar>
                Details
                <ButtonToolbar>
                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('Consumption','Consumption')}>Consumption</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('NetLow','NetLow')}>Net Low</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('NetHigh','NetHigh')}>Net High</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('Generation','Generation')}>Generation</Button>.

                </ButtonToolbar>
            </div>

        );
    }
}
export default PresentationButtonBar;