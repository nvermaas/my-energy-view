
import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';


class PresentationButtonBar extends Component {

    handleChoice = (presentation,dataset) => {
        this.props.handleChoice(presentation,dataset);
    }

    render() {

        return (
            <div>

                <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" onClick={() => this.handleChoice('Gas','Gas')}>GAS</Button>&nbsp;
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('Net Electric Power','Netto')}>POWER</Button>&nbsp;
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('Consumption','Consumption')}>Consumed</Button>&nbsp;
                    <Button bsStyle="warning" bsSize="large" onClick={() => this.handleChoice('Generation','Generation')}>Generated</Button>&nbsp;

                </ButtonToolbar>

                &nbsp;

                <ButtonToolbar>
                        <Button bsStyle="primary" bsSize="large" onClick={() => this.handleChoice('Meteo','Meteo')}>Rain & Temp</Button>&nbsp;
                        <Button bsStyle="primary" bsSize="large" onClick={() => this.handleChoice('Wind','Wind')}>Wind</Button>&nbsp;
                </ButtonToolbar>
            </div>

        );
    }
}
export default PresentationButtonBar;