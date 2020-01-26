import React from 'react';
import ElectricityGraph from './ElectricityGraph';
import {fillYAxis, constructTitle, constructSubTitle} from './GraphUtils'

export default function drawElecticityGraph(props, dataTypes, kind, barColor1) {
    let title = constructTitle(props)
    let subTitle = constructSubTitle(props)
    let footer = ''
    let all_data=props.fetchedData

    if (barColor1==undefined) {
        barColor1 = "#9C8908"
    }

    if (kind === 'combined') {

        // draw a stacked bar diagram with NetLow and NetHigh combined
        let data1 = all_data.data[dataTypes['NetLow']]["data"]
        let total1 = all_data.data[dataTypes['NetLow']]["total"]
        let data2 = all_data.data[dataTypes['NetHigh']]["data"]
        let total2 = all_data.data[dataTypes['NetHigh']]["total"]
        let total_solar_panels = all_data.data[dataTypes['Solar Panels']]["total"]
        let items1 = fillYAxis(data1,false,1)
        let items2 = fillYAxis(data2,false,1)

        // add consumption graph
        let data3 = all_data.data[dataTypes['Consumption']]["data"]
        let items3 = fillYAxis(data3, false,1)

        // add Generation graph
        //let data4 = all_data.data[dataTypes['Generation']]["data"]
        let data4 = all_data.data[dataTypes['Solar Panels']]["data"]
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

        if (total_solar_panels!==null) {
            let total = Math.round(total_solar_panels/1000 * 10)/10
            footer = 'Solar Panels Total :  (' + total + ' kWh)'
        }

        return <ElectricityGraph
            title={title}
            subTitle={subTitle}
            footer={footer}
            x={"x"}
            y={"value"}
            items1={items1}
            barColor1={barColor1}
            items2={items2}
            items3={items3}
            items4={items4}
            tickValues={props.tickValues}
            handleZoom={props.handleZoom}
        />

    } else {
        // draw a single bar diagram
        let dataset = props.dataset

        let data = all_data.data[dataTypes[dataset]]["data"]
        let total = all_data.data[dataTypes[dataset]]["total"]

        let items = fillYAxis(data,false,1)

        subTitle = subTitle + ' ('+Math.round(total/1000 * 10)/10 + ' kWh)'

        // add costs
        let electricityPrice = localStorage.getItem('QboxElectricityPrice')
        if (electricityPrice!=null) {
            let costs = Math.round(electricityPrice * total / 1000 * 100) / 100
            subTitle = subTitle + ' = € ' + costs
        }

        return <ElectricityGraph
            title={title}
            subTitle={subTitle}
            x={"x"}
            y={"value"}
            items1={items}
            barColor1={barColor1}
            tickValues={props.tickValues}
            handleZoom={props.handleZoom}
        />
    }
}