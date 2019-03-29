
import React, { Component } from 'react';
import { svg, g, VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel  } from 'victory';



class WindGraph extends Component {


    handleEvent = (event, props) => {
        this.props.handleZoom(props.index)
    }

    render() {
        //alert(this.props.tickValues)
        let y_label = "WindGust in m/s"
        let x_label = this.props.subTitle

        let itemsWindSpeed = this.props.itemsWindSpeed
        let itemsWindGust = this.props.itemsWindGust

        let myXAxis =
            <VictoryAxis
                tickValues={this.props.tickValues}
                label={x_label}
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

        // configure the WindGust Bar
        let myWindGustBar
        if (itemsWindGust!==undefined) {
            myWindGustBar =
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

                    data={this.props.itemsWindGust}
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

        let myWindGustBarAxis =
            <VictoryAxis
                dependentAxis
                standalone={false}
                tickFormat={(value) => (`${value/this.props.scaleWindGust} m/s`)}
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

        // configure the WindSpeed line
        let myWindSpeedLine
        let myWindSpeedAxis
        if (itemsWindSpeed!==undefined) {
            myWindSpeedLine =
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

                    data={this.props.itemsWindSpeed}
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
            myWindSpeedAxis =
                <VictoryAxis
                    dependentAxis
                    standalone={false}
                    tickFormat={(temp) => (`${Math.round(temp/this.props.scaleWindSpeed)} m/s`)}
                    domain = {{y: this.props.domainWindSpeed}}
                    tickCount = {5}

                    animate={{
                        duration: 1000,
                        easing: "bounce"
                    }}
                    label="WindSpeed"

                    orientation = "right"
                    style={{
                        axisLabel: {fontSize: 10, fill: "#c43a31", padding: 33},
                        tickLabels: {fontSize: 9, fill: "#c43a31", padding: 25, textAnchor: "end"}
                    }}
                />
        }


        return (
            <div style={{ parent: { maxWidth: "100%" } }}>
                <svg viewBox="0 0 900 600"

                    domainPadding={{ x: 5 }}
                    theme={VictoryTheme.material}
                    width={900}>

                    {/* https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform */}
                    <g
                        fill="grey"
                        transform={"translate(0, 10) " +
                                   "scale(2 2)"}
                    >
                        {/* Define labels */}
                        <VictoryLabel x={150} y={5}  style={{fontSize: 13}} text={this.props.title}/>
                        <VictoryLabel x={150} y={25} style={{fontSize: 10}} text="Wind Speed and Gust"/>

                        {myXAxis}

                        {myWindSpeedAxis}
                        {myWindSpeedLine}
                        {myWindGustBarAxis}
                        {myWindGustBar}
                    </g>
                </svg>

            </div>

        );

    }

}
export default WindGraph;

