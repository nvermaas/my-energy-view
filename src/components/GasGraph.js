
import React, { Component } from 'react';
import { svg, g, VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel  } from 'victory';


class GasGraph extends Component {

    handleEvent = (event, props) => {
        //alert('GasGraph.handleEvent:' +props.index)
        this.props.handleZoom(props.index)
    }

    render() {
        //alert(this.props.tickValues)
        let y_label = "usage in m3"
        let x_label = "click on a bar to zoom in"

        let itemsTemperature = this.props.itemsTemperature;

        let myXAxis =
            <VictoryAxis
                tickValues={this.props.tickValues}
                label={x_label}
                style={{
                    axis: {stroke: "#756f6a"},
                    axisLabel: {fontSize: 10, padding: 30},
                    grid: {stroke: (t) => t > 0.5 ? "grey" : "grey"},
                    ticks: {stroke: "grey", size: 5},
                    tickLabels: {fontSize: 9, padding: 5}
                }}
            />

        // configure the Gas Bar
        let myGasBar =
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

                events={[
                    {
                        target: "data",
                        eventHandlers: {
                            onClick: (evt, clickedProps) => this.handleEvent(evt, clickedProps)
                        }}
                ]}

            />

        let myGasBarAxis =
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

        // configure the Temperature line
        let myTemperatureLine
        let myTemperatureAxis
        if (itemsTemperature!==undefined) {
            myTemperatureLine =
                <VictoryLine
                    style={{
                        data: {
                            stroke: "#c43a31",
                            // stroke: "#C0C0C0",
                            strokeWidth: 1.5,
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

                    data={this.props.itemsTemperature}
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
            myTemperatureAxis =
                <VictoryAxis
                    dependentAxis
                    tickFormat={(temp) => (`${Math.round(temp/this.props.scale)} ºC`)}
                    //tickValues={[-200, 0, 200, 400, 600, 800]}
                    //domain = {{y: [-10,40]}}
                    tickCount = {5}

                    animate={{
                        duration: 1000,
                        easing: "bounce"
                    }}
                    label="Outside Temperature"

                    orientation = "right"
                    style={{
                        axisLabel: {fontSize: 10, fill: "#c43a31", padding: 33},
                        tickLabels: {fontSize: 9, fill: "#c43a31", padding: 25, textAnchor: "end"}
                    }}
                />
        }


        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <VictoryChart
                    style={{ parent: { maxWidth: "100%" } }}
                    domainPadding={{ x: 15 }}
                    theme={VictoryTheme.material}
                    width={600}>

                    {/* Define labels */}
                    <VictoryLabel x={150} y={5}  style={{fontSize: 15}} text={this.props.title}/>
                    <VictoryLabel x={150} y={25} style={{fontSize: 12}} text={this.props.subTitle}/>

                    {myXAxis}

                    {myGasBarAxis}
                    {myTemperatureAxis}

                    {myGasBar}
                    {myTemperatureLine}


                </VictoryChart>

            </div>

        );
    }


}
export default GasGraph;