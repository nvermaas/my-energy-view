/**
 * Created by Vermaas on 1/20/2019.
 */
import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryStack, VictoryZoomContainer } from 'victory';
import GasGraph from './GasGraph';
import ElectricityGraph from './ElectricityGraph';

const color_gas = "0081C9"
const color_electricity = "#FFDD00"

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

class MainGraph extends Component {
    render() {
        let presentation = this.props.presentation
        let dataset = this.props.dataset

        // this is all the fetched data in a json structure
        let all_data=this.props.data

        let drawGraph

        // the buttons determine which presentation is wanted, extract data and graph accordingly
        if (presentation=='Gas') {
            let data = all_data.data[energyTypes['Gas']]["data"]
            let items = fillYAxis(data)

            drawGraph = <GasGraph x={"month"} y={"value"} items={items}/>
        } else

        if (presentation=='Netto') {
            // draw a stacked bar diagram with NetLow and NetHigh combined
            let data1 = all_data.data[energyTypes['NetLow']]["data"]
            let data2 = all_data.data[energyTypes['NetHigh']]["data"]
            let items1 = fillYAxis(data1)
            let items2 = fillYAxis(data2)

            drawGraph = <ElectricityGraph x={"month"} y={"value"} items1={items1} items2={items2}/>

        } else {
            // draw a single bar diagram
            let data = all_data.data[energyTypes[dataset]]["data"]
            let items = fillYAxis(data)

            drawGraph = <ElectricityGraph x={"month"} y={"value"} items1={items}/>
        }


        return (
            <div>
                {drawGraph}
            </div>
        );
    }
}

export default MainGraph;
