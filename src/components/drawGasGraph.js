import React from 'react';
import GasGraph from './GasGraph';
import {fillYAxis, getMax, getScale, constructTitle, constructSubTitle} from './GraphUtils'

export default function drawGasGraph(props, dataTypes) {

    // this is all the fetched data in a json structure
    let all_data=props.state.fetchedData

    let total = all_data.data[dataTypes['Gas']]["total"]
    let data = all_data.data[dataTypes['Gas']]["data"]
    let items = fillYAxis(data, false, 1)
    let range = getMax(items)

    let scale = getScale(data, range)

    // contruct the title based on the properties in the state
    let title = constructTitle(props.state)
    let subTitle = constructSubTitle(props.state)

    let averageTemperature = all_data.data[dataTypes['Temperature']]["average"]

    let itemsTemperature
    try {
        let dataTemperature = all_data.data[dataTypes['Temperature']]["data"]
        itemsTemperature = fillYAxis(dataTemperature, false, scale)
    } catch (e) {
    }

    subTitle = subTitle + ' ('+total/1000 + ' m3)'

    // add costs, read gasprice from local storage (configured by user)
    let gasPrice = localStorage.getItem('QboxGasPrice')
    if (gasPrice!=null) {
        let costs = Math.round(gasPrice * total / 1000 * 100) / 100
        subTitle = subTitle + ' = € ' + costs
    }

    return <GasGraph
        title={title}
        subTitle={subTitle}
        x={"x"}
        y={"value"}
        items={items}
        itemsTemperature={itemsTemperature}
        tickValues={props.state.tickValues}
        handleZoom={props.handleZoom}
        scale={scale}
    />
}