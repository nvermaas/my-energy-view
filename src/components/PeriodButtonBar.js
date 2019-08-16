
import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import MyDatePicker from './MyDatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons'

class PeriodButtonBar extends Component {

    render() {
        let navButton1
        let navButton2
        if (this.props.range !== 'custom') {
            navButton1 =
                <div>
                    <Button variant="warning" onClick={() => this.props.handleChoice('back')}>
                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>
                </div>
            navButton2 =
                <div>
                    <Button variant="warning" onClick={() => this.props.handleChoice('forward')}>
                        Next  <FontAwesomeIcon icon={faStepForward} />
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
                    <Button variant="info" onClick={() => this.props.handleChoice('this_year')}>YEAR</Button>&nbsp;
                    <Button variant="info" onClick={() => this.props.handleChoice('this_month')}>MONTH</Button>&nbsp;
                    <Button variant="info" onClick={() => this.props.handleChoice('this_week')}>WEEK</Button>&nbsp;
                    <Button variant="info" onClick={() => this.props.handleChoice('today')}>DAY</Button>&nbsp;
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