
import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

export default function PresentationButtonBar(props) {

    // overriding the passed eventhandler for the buttons, just to show how that is done.
    const handleChoice = (presentation, dataset) => {
        props.handleChoice(presentation, dataset);
    }

    return (
        <div>

            <ButtonToolbar>
                <Button variant="primary" onClick={() => props.handleChoice('Gas', 'Gas')}>GAS</Button>&nbsp;
                <Button variant="warning"
                        onClick={() => handleChoice('Net Electric Power', 'Netto')}>POWER</Button>&nbsp;
                <Button variant="warning"
                        onClick={() => handleChoice('Consumption', 'Consumption')}>Consumed</Button>&nbsp;
                <Button variant="warning"
                        onClick={() => handleChoice('Generation', 'Generation')}>Generated</Button>&nbsp;

            </ButtonToolbar>

            &nbsp;

            <ButtonToolbar>
                <Button variant="primary" onClick={() => handleChoice('Meteo', 'Meteo')}>Rain & Temp</Button>&nbsp;
                <Button variant="primary" onClick={() => handleChoice('Wind', 'Wind')}>Wind</Button>&nbsp;
            </ButtonToolbar>
        </div>

    );
}