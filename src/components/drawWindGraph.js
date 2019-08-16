import React from 'react';
import WindGraph from './WindGraph';
import {fillYAxis, getMax, getScale, constructTitle, constructSubTitle} from './GraphUtils'

export default function drawWindGraph(props, dataTypes) {

    // this is all the fetched data in a json structure
    let all_data=props.state.fetchedData
    let title = constructTitle(props.state,'Wind')
    let subTitle = ''

    let scaleWindSpeed = 1
    let itemsWindSpeed
    let domainWindSpeed = []
    try {
        let averageWindSpeed = all_data.data[dataTypes['Wind Speed']]["average"]
        let minWindSpeed = all_data.data[dataTypes['Wind Speed']]["min"]
        let maxWindSpeed = all_data.data[dataTypes['Wind Speed']]["max"]
        domainWindSpeed.push(parseInt(minWindSpeed))
        domainWindSpeed.push(parseInt(maxWindSpeed))
        subTitle = subTitle + 'max Wind Speed: '+maxWindSpeed+' km/h, '

        let dataWindSpeed = all_data.data[dataTypes['Wind Speed']]["data"]
        itemsWindSpeed = fillYAxis(dataWindSpeed, false, scaleWindSpeed)

    } catch (e) {
    }

    let minWindGust = all_data.data[dataTypes['Wind Gust']]["min"]
    let maxWindGust = all_data.data[dataTypes['Wind Gust']]["max"]
    let domainWindGust = []
    domainWindGust.push(parseInt(minWindGust))
    domainWindGust.push(parseInt(maxWindGust))
    subTitle = subTitle + 'max Wind Gust: '+maxWindGust+ ' km/h'
    let scaleWindGust = 1
    let itemsWindGust
    try {
        let dataWindGust = all_data.data[dataTypes['Wind Gust']]["data"]
        itemsWindGust = fillYAxis(dataWindGust, false, scaleWindGust)
    } catch (e) {
    }

    return <WindGraph
        title={title}
        subTitle={subTitle}
        x={"x"}
        y={"value"}
        itemsWindSpeed={itemsWindSpeed}
        itemsWindGust={itemsWindGust}
        tickValues={props.state.tickValues}
        handleZoom={props.handleZoom}
        scaleWindSpeed={scaleWindSpeed}
        domainWindSpeed={domainWindSpeed}
        scaleWindGust={scaleWindGust}
        domainWindGust={domainWindGust}
    />


}