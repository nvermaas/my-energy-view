/**
 * Created by Vermaas on 1/20/2019.
 */
import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryPie, VictoryZoomContainer } from 'victory';

const data2012 = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
];

const data2013 = [
    {quarter: 1, earnings: 15000},
    {quarter: 2, earnings: 12500},
    {quarter: 3, earnings: 19500},
    {quarter: 4, earnings: 13000}
];

const data2014 = [
    {quarter: 1, earnings: 11500},
    {quarter: 2, earnings: 13250},
    {quarter: 3, earnings: 20000},
    {quarter: 4, earnings: 15500}
];

const data2015 = [
    {quarter: 1, earnings: 18000},
    {quarter: 2, earnings: 13250},
    {quarter: 3, earnings: 15000},
    {quarter: 4, earnings: 12000}
];

const months = [
    {month: 1, value: 0},
    {month: 2, value: 1},
    {month: 3, value: 2},
    {month: 4, value: 3},
    {month: 5, value: 4},
    {month: 6, value: 5},
    {month: 7, value: 6},
    {month: 8, value: 7},
    {month: 9, value: 8},
    {month: 10, value: 9},
    {month: 11, value: 10},
    {month: 12, value: 11}
];

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

class Example extends Component {
    render() {
        let data=this.props.data
        let result = data.result
        let data_list = data.data
        let data_gas = data_list[3]
        let energyType = data_gas["energyType"] // 'gas'

        let gas_data = data_gas["data"]

        let items = fillYAxis(gas_data)
        //alert(gas_data)

        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <h2>Qbox View</h2>

                <VictoryChart
                    style={{ parent: { maxWidth: "50%" } }}
                    domainPadding={10}
                    theme={VictoryTheme.material}

                >
                    <VictoryAxis
                        tickValues={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x}`)}
                    />
                    <VictoryStack
                        colorScale={"warm"}
                    >
                        <VictoryBar
                            data={items}
                            x={"month"}
                            y={"value"}
                        />


                    </VictoryStack>
                </VictoryChart>

            </div>
        );
    }
}

export default Example;
