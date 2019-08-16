import React from 'react';
import ElectricityGraph from './ElectricityGraph';
import {fillYAxis, getMax, getScale, constructTitle, constructSubTitle} from './GraphUtils'

export default function drawElecticityGraph(props, dataTypes, kind) {
    let title = constructTitle(props.state)
    let subTitle = constructSubTitle(props.state)
    let all_data=props.state.fetchedData

    if (kind === 'combined') {

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
            let subTitle = subTitle + ' = € '+costs
        }

        return <ElectricityGraph
            title={title}
            subTitle={subTitle}
            x={"x"}
            y={"value"}
            items1={items1}
            items2={items2}
            items3={items3}
            items4={items4}
            tickValues={props.state.tickValues}
            handleZoom={props.handleZoom}
        />

    } else {
        // draw a single bar diagram
        let dataset = props.state.dataset

        let data = all_data.data[dataTypes[dataset]]["data"]
        let total = all_data.data[dataTypes[dataset]]["total"]
        let items = fillYAxis(data,false,1)
        subTitle = subTitle + ' ('+Math.round(total/1000) + ' kWh)'

        // add coasts
        let costs = Math.round(0.2 * total/1000 * 100)/100
        subTitle = subTitle + ' = € '+costs

        return <ElectricityGraph
            title={title}
            subTitle={subTitle}
            x={"x"}
            y={"value"}
            items1={items}
            tickValues={props.state.tickValues}
            handleZoom={props.handleZoom}
        />
    }
}