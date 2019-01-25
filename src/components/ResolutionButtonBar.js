
import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

class ResolutionButtonBar extends Component {

    handleChoice = (event) => {
        this.props.handleChoice(event);
    }

    render() {

        return (
            <div>
                Resolution
                <ButtonToolbar>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('year')}>Years</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('month')}>Months</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('day')}>Days</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" onClick={() => this.handleChoice('hour')}>Hours</Button>.

                </ButtonToolbar>
            </div>

        );
    }
}
export default ResolutionButtonBar;