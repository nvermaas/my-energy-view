
import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

import { useStateValue } from '../MyGlobalStateProvider';

export default function PresentationButtonBar(props) {

    const [{my_state, presentation, dataset}, dispatch] = useStateValue();

    // overriding the passed eventhandler for the buttons, just to show how that is done.
    const handleChoice = (presentation, dataset) => {
        props.handleChoice(presentation, dataset);
    }

    // These 2 dispatch function are not being used, but left as an example.
    // this is how you would dispatch an action to the global state provider:
    // <Button variant="warning" onClick={() => myDispatchChangeHost('unknown','host')}>{my_state.host}</Button>&nbsp;

    const myDispatchChangeHost = (host, status) => {
            dispatch({
                type: 'CHANGE_HOST',
                newHostStatus: {host: host, status: status}
            })
    }

    const myDispatch = (presentation, dataset) => {
        dispatch({
            type: 'SET_PRESENTATION',
            newPresentation: {presentation: presentation, dataset: dataset}
        })
    }

    return (
        <div>

            <ButtonToolbar>
                <Button variant="primary" onClick={() => handleChoice('Gas', 'Gas')}>GAS</Button>&nbsp;
                <Button variant="warning" onClick={() => handleChoice('Net Electric Power', 'Netto')}>POWER</Button>&nbsp;
                <Button variant="warning" onClick={() => handleChoice('Consumption', 'Consumption')}>Consumed</Button>&nbsp;
                <Button variant="warning" onClick={() => handleChoice('Generation', 'Generation')}>Generated</Button>&nbsp;
                <Button variant="warning" onClick={() => handleChoice('Generation', 'Generation')}>Generated</Button>&nbsp;
            </ButtonToolbar>

            &nbsp;

            <ButtonToolbar>
                <Button variant="primary" onClick={() => handleChoice('Meteo', 'Meteo')}>Rain & Temp</Button>&nbsp;
                <Button variant="primary" onClick={() => handleChoice('Wind', 'Wind')}>Wind</Button>&nbsp;
            </ButtonToolbar>
        </div>

    );
}