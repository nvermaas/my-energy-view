
import React, { Component } from 'react';
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import MyDatePicker from './MyDatePicker';

class PeriodButtonBar extends Component {

    handleChoice = (choice) => {
        //alert('PeriodButtonBar.handleChoice:' +choice)
        this.props.handleChoice(choice);
    }

    handleChangeDate = (date) => {
        alert('PeriodButtonBar.handleChangeDate:' +date)
        this.props.handleChangeDate(date);
    }

    render() {

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
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('back')}>
                        <Glyphicon glyph="step-backward" /> {this.props.range} terug
                    </Button>.

                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('forward')}>
                        {this.props.range} verder<Glyphicon glyph="step-forward" />
                    </Button>.

                    <MyDatePicker
                        date={this.props.from}
                        handleChangeDate={this.handleChangeDate}/>

                </ButtonToolbar>
            </div>

        );
    }
}
export default PeriodButtonBar;