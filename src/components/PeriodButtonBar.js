
import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import MyDatePicker from './MyDatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons'

export default function PeriodButtonBar(props) {

    let navButton1
    let navButton2
    if (props.range !== 'custom') {
        navButton1 =
            <div>
                <Button variant="warning" onClick={() => props.handleChoice('back')}>
                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                </Button>
            </div>
        navButton2 =
            <div>
                <Button variant="warning" onClick={() => props.handleChoice('forward')}>
                    Next  <FontAwesomeIcon icon={faStepForward} />
                </Button>
            </div>
    }

    let periodSelection
    if ((props.range === 'Maand') || (props.range === 'custom')) {
        if (props.resolution === 'Day') {
            periodSelection =
                <div>
                    <MyDatePicker
                        from={props.from}
                        to={props.to}
                        handleChangeDate={props.handleChangeDate}/>
                </div>
        }
    }
    return (
        <div>
            {/* buttons for the current moment */}
            <ButtonToolbar>
                <Button variant="info" onClick={() => props.handleChoice('this_year')}>YEAR</Button>&nbsp;
                <Button variant="info" onClick={() => props.handleChoice('this_month')}>MONTH</Button>&nbsp;
                <Button variant="info" onClick={() => props.handleChoice('this_week')}>WEEK</Button>&nbsp;
                <Button variant="info" onClick={() => props.handleChoice('today')}>DAY</Button>&nbsp;
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
