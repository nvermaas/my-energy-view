
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
                <ButtonToolbar>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="primary" onClick={() => this.handleChoice('year')}>Year</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" onClick={() => this.handleChoice('Month')}>Month</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning" onClick={() => this.handleChoice('Day')}>Day</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('Today')}>Today</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('ThisMonth')}>This Month</Button>.


                </ButtonToolbar>
            </div>

        );
    }
}
export default PeriodButtonBar;