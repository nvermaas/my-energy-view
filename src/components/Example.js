/**
 * Created by Vermaas on 1/20/2019.
 */
import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryPie, VictoryZoomContainer } from 'victory';


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

                <VictoryChart
                    style={{ parent: { maxWidth: "70%" } }}
                    domainPadding={{ x: 15 }}
                    theme={VictoryTheme.material}
                    width={600}
                >
                    {/* Define labels */}
                    <VictoryLabel x={200} y={24} text="Gasverbruik 2018 per maand"
                    />
                    <VictoryAxis
                        tickValues={["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]}
                        label="Maand"
                        style={{
                            axis: {stroke: "#756f6a"},
                            axisLabel: {fontSize: 10, padding: 30},
                            grid: {stroke: (t) => t > 0.5 ? "red" : "grey"},
                            ticks: {stroke: "grey", size: 5},
                            tickLabels: {fontSize: 9, padding: 5}
                        }}
                    />

                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x/1000}`)}
                        animate={{
                            duration: 2000,
                            easing: "bounce"
                        }}
                        label="Verbruik in 1000 m3"
                        style={{
                            axis: {stroke: "#756f6a"},
                            axisLabel: {fontSize: 10, padding: 30},
                            grid: {stroke: (t) => t > 0.5 ? "red" : "grey"},
                            ticks: {stroke: "grey", size: 5},
                            tickLabels: {fontSize: 9, padding: 5}
                        }}
                    />

                    <VictoryBar
                        style={{
                            data: {
                                fill: "#0081C9",
                                fillOpacity: 0.7,
                            },
                            labels: {
                                fontSize: 10,
                                fill: (d) => d.x === 3 ? "#000000" : "#c43a31"
                            }
                        }}

                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}

                        data={items}
                        x={"month"}
                        y={"value"}
                    />

                </VictoryChart>

            </div>
        );
    }
}

export default Example;
