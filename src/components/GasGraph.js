
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel  } from 'victory';


export default function GasGraph(props) {

    const handleEvent = (event, event_props) => {
        //alert('GasGraph.handleEvent:' +props.index)
        props.handleZoom(event_props.index)
    }
    
    //alert(this.props.tickValues)
    let y_label = "usage in m3"
    let x_label = "click on a bar to zoom in"

    let myXAxis =
        <VictoryAxis
            tickValues={props.tickValues}
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

            data={props.items}
            x={props.x}
            y={props.y}

            events={[
                {
                    target: "data",
                    eventHandlers: {
                        onClick: (evt, clickedProps) => handleEvent(evt, clickedProps)
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


        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <VictoryChart
                    style={{ parent: { maxWidth: "100%" } }}
                    domainPadding={{ x: 15 }}
                    theme={VictoryTheme.material}
                    width={600}>

                    {/* Define labels */}
                    <VictoryLabel x={150} y={5}  style={{fontSize: 15}} text={props.title}/>
                    <VictoryLabel x={150} y={25} style={{fontSize: 12}} text={props.subTitle}/>

                    {myXAxis}
                    {myGasBarAxis}
                    {myGasBar}

                </VictoryChart>

            </div>

        );
}
