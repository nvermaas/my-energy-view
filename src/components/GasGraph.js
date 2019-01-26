
import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel  } from 'victory';

class GasGraph extends Component {

    render() {

        let y_label = "verbruik in m3"

        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <VictoryChart
                    style={{ parent: { maxWidth: "100%" } }}
                    domainPadding={{ x: 15 }}
                    theme={VictoryTheme.material}
                    width={600}
                >
                    {/* Define labels */}
                    <VictoryLabel x={200} y={24} text={this.props.title}
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
                        barRatio={0.8}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}

                        data={this.props.items}
                        x={this.props.x}
                        y={this.props.y}
                    />

                </VictoryChart>
            </div>

        );
    }
}
export default GasGraph;