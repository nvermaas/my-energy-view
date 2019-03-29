/**
 * Created by Vermaas on 1/20/2019.
 */
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import GasGraph from './GasGraph';
import ElectricityGraph from './ElectricityGraph';
import MeteoGraph from './MeteoGraph';
import WindGraph from './WindGraph';
import {getYear, getMonthName, getFullDate, getWeek} from '../utils/DateUtils'

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

function getScale(data, range) {
    let scale = 1
    if (data.length > 48) {
        scale = 10
    } else
    if (data.length === 24) {
        scale = 40
    } else
    if (data.length === 7) {
        scale = 100
    }

    let scale_calc = (Math.round(range / 300)+1) * 10

    if (range <1000) {
        scale = 20
    } else
    if (range < 2000) {
        scale = 40
    } else
    if (range < 3000) {
        scale = 60
    } else
    if (range < 5000) {
        scale = 100
    } else
    if (range < 10000) {
        scale = 200
    } else
    if (range < 20000) {
            scale = 400
    } else {
        scale = 8000
    }
    // depending on the dimensions of the domain of the main graph, the secondary domain must be scaled

    //alert('range '+range+' => scale '+scale+' (calc = '+scale_calc+')')
    return scale
}

function getMax(items) {
    let item = items[0]
    let max = item.value

    for (var i = 0; i < items.length; i++) {
        if (items[i].value > max) {
            max = items[i].value
        }
    }
    return max
}

function fillYAxis(data, negative, factor) {
    let items = []
    for (var i = 0; i < data.length; i++) {
        let item = {}
        item.month = i+1;
        if (negative==true) {
            item.value = parseInt(data[i]) * -1
        } else {
            item.value = data[i]
        }
        item.value = item.value * factor
        items.push(item)
        //alert(items.value)
    }
    return items
}

function constructSubTitle(props) {

    let title = props.presentation
    return title
}

function constructTitle(props, extra_title='') {
    let title = extra_title + props.from + ' - ' + props.to

    if (props.range === 'Jaar') {
        let year = getYear(props.from)
        title = year

    } else if (props.range === 'Maand') {
        let year = getYear(props.from)
        let month = getMonthName(props.from)
        title = month + ' ' + year
    }

    if (props.range === 'Week') {
        let year = getYear(props.from)
        let week = getWeek(props.from)
        title = 'Week ' + week + ', ' + year
    }

    if (props.range === 'Dag') {
        title = getFullDate(props.from)
    }

    return title
}

class MainGraph extends Component {

    drawGasGraph() {
        // this is all the fetched data in a json structure
        let all_data=this.props.state.fetchedData

        let total = all_data.data[dataTypes['Gas']]["total"]
        let data = all_data.data[dataTypes['Gas']]["data"]
        let items = fillYAxis(data, false, 1)
        let range = getMax(items)

        let scale = getScale(data, range)

        // contruct the title based on the properties in the state
        let title = constructTitle(this.props.state)
        let subTitle = constructSubTitle(this.props.state)

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
            x={"month"}
            y={"value"}
            items={items}
            itemsTemperature={itemsTemperature}
            tickValues={this.props.state.tickValues}
            handleZoom={this.props.handleZoom}
            scale={scale}
        />
    }

    drawMeteoGraph() {
        // this is all the fetched data in a json structure

        let all_data=this.props.state.fetchedData
        let title = constructTitle(this.props.state,'Wind and Temperature')
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
            subTitle = subTitle + 'temperature: min '+minTemperature+'ºC, max '+maxTemperature+'ºC, '

            let dataTemperature = all_data.data[dataTypes['Temperature']]["data"]
            itemsTemperature = fillYAxis(dataTemperature, false, scaleTemperature)

        } catch (e) {
        }

        let totalRain = all_data.data[dataTypes['Rain']]["total"]
        let minRain = all_data.data[dataTypes['Rain']]["min"]
        let maxRain = all_data.data[dataTypes['Rain']]["max"]
        let domainRain = []
        domainRain.push(parseInt(Math.round(minRain)))
        domainRain.push(parseInt(Math.round(maxRain)))
        subTitle = subTitle + 'rain: '+totalRain+ ' mm'
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
            x={"month"}
            y={"value"}
            itemsTemperature={itemsTemperature}
            itemsRain={itemsRain}
            tickValues={this.props.state.tickValues}
            handleZoom={this.props.handleZoom}
            scaleTemperature={scaleTemperature}
            domainTemperature={domainTemperature}
            scaleRain={scaleRain}
            domainRain={domainRain}
        />
    }

    drawWindGraph() {
        // this is all the fetched data in a json structure

        let all_data=this.props.state.fetchedData
        let title = constructTitle(this.props.state,'Wind')
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
            subTitle = subTitle + 'Wind Speed: min '+minWindSpeed+'m/s, max '+maxWindSpeed+'m/s, '

            let dataWindSpeed = all_data.data[dataTypes['Wind Speed']]["data"]
            itemsWindSpeed = fillYAxis(dataWindSpeed, false, scaleWindSpeed)

        } catch (e) {
        }

        let minWindGust = all_data.data[dataTypes['Wind Gust']]["min"]
        let maxWindGust = all_data.data[dataTypes['Wind Gust']]["max"]
        let domainWindGust = []
        domainWindGust.push(parseInt(minWindGust))
        domainWindGust.push(parseInt(maxWindGust))
        subTitle = subTitle + 'Max Wind Gust: '+maxWindGust+ ' m/s'
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
            x={"month"}
            y={"value"}
            itemsWindSpeed={itemsWindSpeed}
            itemsWindGust={itemsWindGust}
            tickValues={this.props.state.tickValues}
            handleZoom={this.props.handleZoom}
            scaleTemperature={scaleWindSpeed}
            domainTemperature={domainWindSpeed}
            scaleWindGust={scaleWindGust}
            domainWindGust={domainWindGust}
        />
    }

    render() {
        let presentation = this.props.state.presentation
        let dataset = this.props.state.dataset

        // this is all the fetched data in a json structure
        let all_data=this.props.state.fetchedData

        // contruct the title based on the properties in the state
        let title = constructTitle(this.props.state)
        let subTitle = constructSubTitle(this.props.state)

        // initialize the drawGraph
        let drawGraph
        let scale=1

        let averageTemperature

        // the presentation buttons determine which presentation is wanted, extract data and graph accordingly
        if (presentation==='Gas') {
            drawGraph = this.drawGasGraph()
        } else

        // the presentation buttons determine which presentation is wanted, extract data and graph accordingly
        if (presentation==='Meteo') {
            drawGraph = this.drawMeteoGraph()
        } else

        if (presentation==='Wind') {
            drawGraph = this.drawWindGraph()
        } else

        if (presentation==='Net Electric Power') {
            // draw a stacked bar diagram with NetLow and NetHigh combined
            let data1 = all_data.data[dataTypes['NetLow']]["data"]
            let total1 = all_data.data[dataTypes['NetLow']]["total"]
            let data2 = all_data.data[dataTypes['NetHigh']]["data"]
            let total2 = all_data.data[dataTypes['NetHigh']]["total"]
            let items1 = fillYAxis(data1,false,1)
            let items2 = fillYAxis(data2,false,1)

            // add consumption graph
            let data3 = all_data.data[dataTypes['Consumption']]["data"]
            let items3 = fillYAxis(data3, false,1)

            // add Generation graph
            let data4 = all_data.data[dataTypes['Generation']]["data"]
            let items4 = fillYAxis(data4, true,1)
            console.log(items4)

            let total = total1 + total2
            subTitle = subTitle + ' ('+Math.round(total/1000) + ' kWh)'

            // add costs, read gasprice from local storage (configured by user)
            let electricityPrice = localStorage.getItem('QboxElectricityPrice')
            if (electricityPrice!=null) {
                let costs = Math.round(electricityPrice * total/1000 * 100)/100
                subTitle = subTitle + ' = € '+costs
            }

            drawGraph = <ElectricityGraph
                title={title}
                subTitle={subTitle}
                x={"month"}
                y={"value"}
                items1={items1}
                items2={items2}
                items3={items3}
                items4={items4}
                tickValues={this.props.state.tickValues}
                handleZoom={this.props.handleZoom}
            />

        } else {
            // draw a single bar diagram
             let data = all_data.data[dataTypes[dataset]]["data"]
            let total = all_data.data[dataTypes[dataset]]["total"]
            let items = fillYAxis(data,false,1)
            subTitle = subTitle + ' ('+Math.round(total/1000) + ' kWh)'

            // add coasts
            let costs = Math.round(0.2 * total/1000 * 100)/100
            subTitle = subTitle + ' = € '+costs

            drawGraph = <ElectricityGraph
                title={title}
                subTitle={subTitle}
                x={"month"}
                y={"value"}
                items1={items}
                tickValues={this.props.state.tickValues}
                handleZoom={this.props.handleZoom}
            />
        }


        return (
            <div>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h5">{title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {drawGraph}
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

export default MainGraph;
