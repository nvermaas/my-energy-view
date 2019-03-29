
import React, { Component } from 'react';
import { svg, g, VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel  } from 'victory';



class WindGraph extends Component {


    handleEvent = (event, props) => {
        this.props.handleZoom(props.index)
    }

    render() {
        //alert(this.props.tickValues)
        let y_label = "Wind Speed in km/h"
        let x_label = this.props.subTitle

        let itemsWindSpeed = this.props.itemsWindSpeed
        let itemsWindGust = this.props.itemsWindGust

        let myXAxis =
            <VictoryAxis
                tickValues={this.props.tickValues}
                scale="linear"
                standalone={false}
                style={{
                    axis: {stroke: "#756f6a"},
                    axisLabel: {fontSize: 10, padding: 30},
                    grid: {stroke: (t) => t > 0.5 ? "grey" : "grey"},
                    ticks: {stroke: "grey", size: 1},
                    tickLabels: {fontSize: 8, padding: 5}
                }}
            />

        // configure the WindSpeed Bar
        let myWindSpeedBar
        if (itemsWindSpeed!==undefined) {
            myWindSpeedBar =
                <VictoryBar
                    standalone={false}
                    style={{
                        data: {
                            fill: "#76a3c9",
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

                    data={this.props.itemsWindSpeed}
                    x={this.props.x}
                    y={this.props.y}

                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                onClick: (evt, clickedProps) => this.handleEvent(evt, clickedProps)
                            }
                        }
                    ]}

                />
        }

        let myWindSpeedBarAxis =
            <VictoryAxis
                dependentAxis
                standalone={false}
                tickFormat={(value) => (`${value/this.props.scaleWindSpeed}`)}
                scale="linear"
                animate={{
                    duration: 2000,
                    easing: "bounce"
                }}
                label={y_label}
                style={{
                    axis: {stroke: "#756f6a"},
                    axisLabel: {fontSize: 10, padding: 30},
                    grid: {stroke: (t) => t > 0.5 ? "grey" : "grey"},
                    ticks: {stroke: "grey", size: 1},
                    tickLabels: {fontSize: 9, padding: 5}
                }}
            />

        // configure the WindGust line
        let myWindGustLine
        let myWindGustAxis
        if (itemsWindGust!==undefined) {
            myWindGustLine =
                <VictoryLine
                    standalone={false}
                    //domain = {{y: this.props.domainWindGust}}
                    style={{
                        data: {
                            stroke: "#1315c4",
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

                    data={this.props.itemsWindGust}
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
            myWindGustAxis =
                <VictoryAxis
                    dependentAxis
                    standalone={false}
                    tickFormat={(temp) => (`${Math.round(temp/this.props.scaleWindGust)}`)}
                    domain = {{y: this.props.domainWindGust}}
                    tickCount = {5}

                    animate={{
                        duration: 1000,
                        easing: "bounce"
                    }}
                    label="Wind Gust in km/h"

                    orientation = "right"
                    style={{
                        axisLabel: {fontSize: 10, fill: "#1315c4", padding: 30},
                        tickLabels: {fontSize: 9, fill: "#1315c4", padding: 17, textAnchor: "end"}
                    }}
                />
        }


        return (
            <div style={{ parent: { maxWidth: "100%" } }}>
                <VictoryChart
                    style={{ parent: { maxWidth: "100%" } }}
                    domainPadding={{ x: 15 }}
                    theme={VictoryTheme.material}
                    width={600}>


                        {/* Define labels */}
                        <VictoryLabel x={100} y={5}  style={{fontSize: 13}} text={this.props.title}/>
                        <VictoryLabel x={100} y={25} style={{fontSize: 10}} text={this.props.subTitle}/>

                        {myXAxis}
                        {myWindGustLine}
                        {myWindSpeedBarAxis}
                        {myWindSpeedBar}
                </VictoryChart>

            </div>

        );

    }

}
export default WindGraph;

