/**
 * Created by Vermaas on 1/20/2019.
 */
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import GasGraph from './GasGraph';
import ElectricityGraph from './ElectricityGraph';
import {getYear, getMonthName, getFullDate, getWeek} from '../utils/DateUtils'

const energyTypes = {
    "NetLow" : 0,
    "Consumption" : 1 ,
    "NetHigh" : 2,
    "Gas" : 3,
    "Generation" : 4}


function fillYAxis(data) {
    let items = []
    for (var i = 0; i < data.length; i++) {
        let item = {}
        item.month = i+1;
        item.value = data[i]
        items.push(item)
    }
    return items
}

function constructSubTitle(props) {

    let title = props.presentation + ' verbruik '
    return title
}

function constructTitle(props) {
    let title = props.presentation + ' ' + props.from + ' - ' + props.to

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

        // the buttons determine which presentation is wanted, extract data and graph accordingly
        if (presentation==='Gas') {
            let total = all_data.data[energyTypes['Gas']]["total"]
            let data = all_data.data[energyTypes['Gas']]["data"]
            let items = fillYAxis(data)

            subTitle = subTitle + ' ('+total/1000 + ' m3)'

            // add costs, read gasprice from local storage (configured by user)
            let gasPrice = localStorage.getItem('QboxGasPrice')
            if (gasPrice!=null) {
                let costs = Math.round(gasPrice * total / 1000 * 100) / 100
                subTitle = subTitle + ' = € ' + costs
            }

            drawGraph = <GasGraph
                title={title}
                subTitle={subTitle}
                x={"month"}
                y={"value"}
                items={items}
                tickValues={this.props.state.tickValues}
                handleZoom={this.props.handleZoom}
            />
        } else

        if (presentation==='Netto Stroom') {
            // draw a stacked bar diagram with NetLow and NetHigh combined
            let data1 = all_data.data[energyTypes['NetLow']]["data"]
            let total1 = all_data.data[energyTypes['NetLow']]["total"]
            let data2 = all_data.data[energyTypes['NetHigh']]["data"]
            let total2 = all_data.data[energyTypes['NetHigh']]["total"]
            let items1 = fillYAxis(data1)
            let items2 = fillYAxis(data2)

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
                tickValues={this.props.state.tickValues}
                handleZoom={this.props.handleZoom}
            />

        } else {
            // draw a single bar diagram
             let data = all_data.data[energyTypes[dataset]]["data"]
            let total = all_data.data[energyTypes[dataset]]["total"]
            let items = fillYAxis(data)
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
