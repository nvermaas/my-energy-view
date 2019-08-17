
import React, { Component } from 'react';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryStack } from 'victory';

class ElectricityGraph extends Component {

    handleEvent = (event, props) => {
        //alert('GasGraph.handleEvent:' +props.index)
        this.props.handleZoom(props.index)
    }

    render() {

        let items1 = this.props.items1;
        let items2 = this.props.items2;
        let items3 = this.props.items3;
        let items4 = this.props.items4;

        let y_label = "kWh"

        let myFirstBar
        if (items1!==undefined) {
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

                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                onClick: (evt, clickedProps) => this.handleEvent(evt, clickedProps)
                            }}
                    ]}
                />
        }

        let mySecondBar
        if (items2!==undefined) {
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

                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                onClick: (evt, clickedProps) => this.handleEvent(evt, clickedProps)
                            }}
                    ]}
                />
        }


        let myFirstLine
        if (items3!==undefined) {
            myFirstLine =
                <VictoryLine
                    style={{
                        data: {
                            stroke: "#c43a31",
                            // stroke: "#C0C0C0",
                            strokeWidth: 0.7,
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

                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                onClick: (evt, clickedProps) => this.handleEvent(evt, clickedProps)
                            }}
                    ]}
                />
        }

        let mySecondLine
        if (items4!==undefined) {
            mySecondLine =
                <VictoryLine
                    style={{
                        data: {
                            stroke: "#008000",
                            //stroke: "#C0C0C0",
                            strokeWidth: 0.7,
                            strokeLinecap: "round",
                            parent: { border: "1px solid #ccc"}
                        },
                        labels: {
                            fontSize: 10,
                            fill: (d) => d.x === 3 ? "#000000" : "#c43a31"
                        }
                    }}

                    animate={{
                        duration: 2000,
                        onLoad: {duration: 1000}
                    }}

                    data={this.props.items4}
                    x={this.props.x}
                    y={this.props.y}

                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                onClick: (evt, clickedProps) => this.handleEvent(evt, clickedProps)
                            }}
                    ]}
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
                    <VictoryLabel x={150} y={5}  style={{fontSize: 15}} text={this.props.title}/>
                    <VictoryLabel x={150} y={25} style={{fontSize: 12}} text={this.props.subTitle}/>
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
                            grid: {stroke: (t) => t > 0.5 ? "grey" : "grey"},
                            ticks: {stroke: "grey", size: 5},
                            tickLabels: {fontSize: 9, padding: 5}
                        }}
                    />
                    {myFirstLine}
                    {mySecondLine}
                    <VictoryStack>
                        {myFirstBar}
                        {mySecondBar}

                    </VictoryStack>

                </VictoryChart>
            </div>

        );
    }
}
export default ElectricityGraph;