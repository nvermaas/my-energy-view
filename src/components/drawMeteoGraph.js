import React from 'react';
import MeteoGraph from './MeteoGraph';
import {fillYAxis, getMax, getScale, constructTitle, constructSubTitle} from './GraphUtils'

export default function drawMeteoGraph(props, dataTypes) {
    // this is all the fetched data in a json structure

    let all_data=props.state.fetchedData
    let title = constructTitle(props.state,'Wind and Temperature')
    let subTitle = ''

    let scaleTemperature = 1
    let itemsTemperature
    let domainTemperature = []
    try {
        let averageTemperature = all_data.data[dataTypes['Temperature']]["average"]
        let minTemperature = all_data.data[dataTypes['Temperature']]["min"]
        let maxTemperature = all_data.data[dataTypes['Temperature']]["max"]
        domainTemperature.push(parseInt(Math.round(minTemperature)))
        domainTemperature.push(parseInt(Math.round(maxTemperature)))
        subTitle = subTitle + 'Temperature: min '+minTemperature+' ºC, max '+maxTemperature+' ºC, '

        let dataTemperature = all_data.data[dataTypes['Temperature']]["data"]
        itemsTemperature = fillYAxis(dataTemperature, false, scaleTemperature)

    } catch (e) {
    }

    let totalRain = all_data.data[dataTypes['Rain']]["total"]
    let minRain = all_data.data[dataTypes['Rain']]["min"]
    let maxRain = all_data.data[dataTypes['Rain']]["max"]
    if (maxRain == 0) {
        maxRain = 1
    }

    let domainRain = []
    domainRain.push(parseInt(Math.round(minRain)))
    domainRain.push(parseInt(Math.round(maxRain)))
    subTitle = subTitle + 'Rain: '+totalRain+ ' mm, '
    let scaleRain = 1
    let itemsRain
    try {
        let dataRain = all_data.data[dataTypes['Rain']]["data"]
        itemsRain = fillYAxis(dataRain, false, scaleRain)
    } catch (e) {
    }

    return <MeteoGraph
        title={title}
        subTitle={subTitle}
        x={"x"}
        y={"value"}
        itemsTemperature={itemsTemperature}
        itemsRain={itemsRain}
        tickValues={props.state.tickValues}
        handleZoom={props.handleZoom}
        scaleTemperature={scaleTemperature}
        domainTemperature={domainTemperature}
        scaleRain={scaleRain}
        domainRain={domainRain}
    />
}