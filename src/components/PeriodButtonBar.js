
import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

class PeriodButtonBar extends Component {

    handleChoice = (event) => {
        // alert('ButtonBar.handleChoice:' +event)
        this.props.handleChoice(event);
    }

    render() {

        return (
            <div>
                Periode
                <ButtonToolbar>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('2018')}>2018</Button>.
                    <Button bsStyle="info" onClick={() => this.handleChoice('2019')}>2019</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('this_month')}>Deze Maand</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('today')}>Vandaag</Button>.

                </ButtonToolbar>
            </div>

        );
    }
}
export default PeriodButtonBar;