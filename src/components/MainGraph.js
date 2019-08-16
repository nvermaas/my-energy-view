import React from 'react';
import { Card } from 'react-bootstrap';

import {constructTitle} from './GraphUtils'
import drawGasGraph from './drawGasGraph'
import drawMeteoGraph from './drawMeteoGraph'
import drawWindGraph from './drawWindGraph'
import drawElectricityGraph from './drawElectricityGraph'

const dataTypes = {
    "NetLow" : 0,
    "Consumption" : 1 ,
    "NetHigh" : 2,
    "Gas" : 3,
    "Generation" : 4,
    "Temperature" : 5,
    "Rain" : 6,
    "Wind Speed" : 7,
    "Wind Gust" : 8,
    "Wind Direction" : 9,
}

export default function MainGraph(props) {

    let presentation = props.state.presentation

    // contruct the title based on the properties in the state
    let title = constructTitle(props.state)

    // initialize the drawGraph
    let drawGraph

    // the presentation buttons determine which presentation is wanted, extract data and graph accordingly
    if (presentation==='Gas') {
        drawGraph = drawGasGraph(props, dataTypes)
    } else

    // the presentation buttons determine which presentation is wanted, extract data and graph accordingly
    if (presentation==='Meteo') {
        drawGraph = drawMeteoGraph(props, dataTypes)
    } else

    if (presentation==='Wind') {
        drawGraph = drawWindGraph(props, dataTypes)
    } else

    if (presentation==='Net Electric Power') {
        drawGraph = drawElectricityGraph(props, dataTypes, 'combined')
    } else

    if (presentation==='Consumption' || presentation==='Generation') {
      drawGraph = drawElectricityGraph(props, dataTypes, 'single')
    }

    return (
        <div>
            <Card border="info">
                <Card.Header>
                    <Card.Title as="h5">{title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    {drawGraph}
                </Card.Body>
            </Card>
        </div>
    );
}

