
import React, { Component } from 'react';
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import MyDatePicker from './MyDatePicker';

class PeriodButtonBar extends Component {

    handleChoice = (choice) => {
        //alert('PeriodButtonBar.handleChoice:' +choice)
        this.props.handleChoice(choice);
    }

    render() {
        let navButton1
        let navButton2
        if (this.props.range !== 'custom') {
            navButton1 =
                <div>
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('back')}>
                        <Glyphicon glyph="step-backward" /> {this.props.range} terug
                    </Button>
                </div>
            navButton2 =
                <div>
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('forward')}>
                        {this.props.range} verder<Glyphicon glyph="step-forward" />
                    </Button>.
                </div>
        }

        let periodSelection
        if ((this.props.range === 'Maand') || (this.props.range === 'custom')) {
            if (this.props.resolution === 'Day') {
                periodSelection =
                    <div>
                        <MyDatePicker
                            from={this.props.from}
                            to={this.props.to}
                            handleChangeDate={this.props.handleChangeDate}/>
                    </div>
            }
        }
        return (
            <div>
                {/* buttons for the current moment */}
                <ButtonToolbar>
                    <Button bsStyle="info" bsSize="large" onClick={() => this.handleChoice('this_year')}>Dit JAAR</Button>.
                    <Button bsStyle="info" bsSize="large" onClick={() => this.handleChoice('this_month')}>Deze MAAND</Button>.
                    <Button bsStyle="info" bsSize="large" onClick={() => this.handleChoice('this_week')}>Deze WEEK</Button>.
                    <Button bsStyle="info" bsSize="large" onClick={() => this.handleChoice('today')}>Deze DAG</Button>.
                </ButtonToolbar>.

                <ButtonToolbar>

                    {/* navigiation and period buttons */}
                    {navButton1}.{navButton2}
                    {periodSelection}

                </ButtonToolbar>
            </div>

        );
    }
}
export default PeriodButtonBar;