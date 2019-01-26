
import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import MyDatePicker from './MyDatePicker';

class PeriodButtonBar extends Component {

    handleChoice = (choice) => {
        //alert('PeriodButtonBar.handleChoice:' +choice)
        this.props.handleChoice(choice);
    }

    render() {

        return (
            <div>
                <ButtonToolbar>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="info" bsSize="large" onClick={() => this.handleChoice('2018')}>2018</Button>.
                    <Button bsStyle="info" bsSize="large" onClick={() => this.handleChoice('2019')}>2019</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" bsSize="large" onClick={() => this.handleChoice('this_month')}>Deze Maand</Button>.

                    {/* Indicates caution should be taken with this action */}

                    <Button bsStyle="info" bsSize="large" onClick={() => this.handleChoice('previous_day')}>Gisteren</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="info" bsSize="large" onClick={() => this.handleChoice('today')}>Vandaag</Button>.

                    {/* Indicates caution should be taken with this action */}
                    <MyDatePicker handleChoice={this.handleChoice}/>
                </ButtonToolbar>
            </div>

        );
    }
}
export default PeriodButtonBar;