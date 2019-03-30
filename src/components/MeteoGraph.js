
import React, { Component } from 'react';
import { svg, g, VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel  } from 'victory';



class MeteoGraph extends Component {


    handleEvent = (event, props) => {
        this.props.handleZoom(props.index)
    }

    render() {
        //alert(this.props.tickValues)
        let y_label = "Rain in mm"
        let x_label = this.props.subTitle

        let itemsTemperature = this.props.itemsTemperature
        let itemsRain = this.props.itemsRain

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

        // configure the Rain Bar
        let myRainBar
        if (itemsRain!==undefined) {
            myRainBar =
                <VictoryBar
                    standalone={false}
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
                        onLoad: {duration: 1000}
                    }}

                    data={this.props.itemsRain}
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

        let myRainBarAxis =
            <VictoryAxis
                dependentAxis
                standalone={false}
                tickFormat={(value) => (`${value}`)}
                domain = {{y: this.props.domainRain}}
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

        // configure the Temperature line
        let myTemperatureLine
        let myTemperatureAxis
        if (itemsTemperature!==undefined) {
            myTemperatureLine =
                <VictoryLine
                    standalone={false}
                    //domain = {{y: this.props.domainRain}}
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
                    standalone={false}
                    tickFormat={(temp) => (`${Math.round(temp/this.props.scaleTemperature)} ºC`)}
                    domain = {{y: this.props.domainTemperature}}
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
                        <VictoryLabel x={100} y={5}  style={{fontSize: 13}} text={this.props.title}/>
                        <VictoryLabel x={100} y={25} style={{fontSize: 10}} text={this.props.subTitle}/>

                        {myXAxis}

                        {myTemperatureAxis}
                        {myTemperatureLine}
                        {myRainBarAxis}
                        {myRainBar}
                    </g>
                </svg>

            </div>

        );

    }

}
export default MeteoGraph;

