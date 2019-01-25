/**
 * Created by Vermaas on 1/20/2019.
 */
import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryStack, VictoryZoomContainer } from 'victory';
import GasGraph from './GasGraph';

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

        let dataset = this.props.dataset
        let my_data=this.props.data

        let data_details = my_data.data[energyTypes[dataset]]
        let data_list = data_details["data"]

        let energyType = data_details["energyType"] // 'gas'
        let title = energyType+" verbruik per maand"

        let items = fillYAxis(data_list)

        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>

                <VictoryChart
                    style={{ parent: { maxWidth: "80%" } }}
                    domainPadding={{ x: 15 }}
                    theme={VictoryTheme.material}
                    width={600}
                >
                    {/* Define labels */}
                    <VictoryLabel x={200} y={24} text={title}
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
                        label="Verbruik in m3"
                        style={{
                            axis: {stroke: "#756f6a"},
                            axisLabel: {fontSize: 10, padding: 30},
                            grid: {stroke: (t) => t > 0.5 ? "red" : "grey"},
                            ticks: {stroke: "grey", size: 5},
                            tickLabels: {fontSize: 9, padding: 5}
                        }}
                    />
                    <GasGraph x={"month"} y={"value"} items={items}/>
                    <VictoryStack>


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
                    </VictoryStack>
                </VictoryChart>

            </div>
        );
    }
}

export default MainGraph;
