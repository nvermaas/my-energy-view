
import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryStack, VictoryZoomContainer } from 'victory';

class ElectricityGraph extends Component {

    render() {

        let items1 = this.props.items1;
        let items2 = this.props.items2;
        let items3 = this.props.items3;

        let title = this.props.title

        let y_label = "verbruik in kWh"

        let myFirstBar
        if (items1!=undefined) {
            myFirstBar =
                <VictoryBar
                    style={{
                        data: {
                            fill: "#9C8908",
                            fillOpacity: 0.7,
                        },
                        labels: {
                            fontSize: 10,
                            fill: (d) => d.x === 3 ? "#000000" : "#c43a31"
                        }
                    }}
                    barRatio={0.8}
                    animate={{
                        duration: 2000,
                        onLoad: {duration: 1000}
                    }}

                    data={this.props.items1}
                    x={this.props.x}
                    y={this.props.y}
                />
        }

        let mySecondBar
        if (items2!=undefined) {
            mySecondBar =
                <VictoryBar
                    style={{
                        data: {
                            fill: "#C2AA08",
                            fillOpacity: 0.7,
                        },
                        labels: {
                            fontSize: 10,
                            fill: (d) => d.x === 3 ? "#000000" : "#c43a31"
                        }
                    }}
                    barRatio={0.8}
                    animate={{
                        duration: 2000,
                        onLoad: {duration: 1000}
                    }}

                    data={this.props.items2}
                    x={this.props.x}
                    y={this.props.y}
                />
        }


        let myThirdBar
        if (items3!=undefined) {
            myThirdBar =
                <VictoryBar
                    style={{
                        data: {
                            fill: "#FFAA08",
                            fillOpacity: 0.7,
                        },
                        labels: {
                            fontSize: 10,
                            fill: (d) => d.x === 3 ? "#000000" : "#c43a31"
                        }
                    }}
                    barRatio={0.8}
                    animate={{
                        duration: 2000,
                        onLoad: {duration: 1000}
                    }}

                    data={this.props.items3}
                    x={this.props.x}
                    y={this.props.y}
                />
        }

        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <VictoryChart
                    style={{ parent: { maxWidth: "100%" } }}
                    domainPadding={{ x: 15 }}
                    theme={VictoryTheme.material}
                    width={600}
                >
                    {/* Define labels */}
                    <VictoryLabel x={200} y={24} text={title}
                    />
                    <VictoryAxis
                        tickValues={this.props.tickValues}
                        //label={x_label}
                        style={{
                            axis: {stroke: "#756f6a"},
                            axisLabel: {fontSize: 10, padding: 30},
                            grid: {stroke: (t) => t > 0.5 ? "grey" : "grey"},
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
                        label={y_label}
                        style={{
                            axis: {stroke: "#756f6a"},
                            axisLabel: {fontSize: 10, padding: 30},
                            grid: {stroke: (t) => t > 0.5 ? "red" : "green"},
                            ticks: {stroke: "grey", size: 5},
                            tickLabels: {fontSize: 9, padding: 5}
                        }}
                    />

                    <VictoryStack>
                        {myFirstBar}
                        {mySecondBar}
                        {myThirdBar}
                    </VictoryStack>

                </VictoryChart>
            </div>

        );
    }
}
export default ElectricityGraph;