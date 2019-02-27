
import React, { Component } from 'react';
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import MyDatePicker from './MyDatePicker';

class PeriodButtonBar extends Component {

    render() {
        let navButton1
        let navButton2
        if (this.props.range !== 'custom') {
            navButton1 =
                <div>
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.props.handleChoice('back')}>
                        <Glyphicon glyph="step-backward" /> Prev
                    </Button>
                </div>
            navButton2 =
                <div>
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.props.handleChoice('forward')}>
                        Next <Glyphicon glyph="step-forward" />
                    </Button>
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
                    <Button bsStyle="info" bsSize="large" onClick={() => this.props.handleChoice('this_year')}>YEAR</Button>&nbsp;
                    <Button bsStyle="info" bsSize="large" onClick={() => this.props.handleChoice('this_month')}>MONTH</Button>&nbsp;
                    <Button bsStyle="info" bsSize="large" onClick={() => this.props.handleChoice('this_week')}>WEEK</Button>&nbsp;
                    <Button bsStyle="info" bsSize="large" onClick={() => this.props.handleChoice('today')}>TODAY</Button>&nbsp;
                </ButtonToolbar>
                &nbsp;
                <ButtonToolbar>

                    {/* navigiation and period buttons */}
                    {navButton1}&nbsp;{navButton2}
                    {periodSelection}

                </ButtonToolbar>
            </div>

        );
    }
}
export default PeriodButtonBar;