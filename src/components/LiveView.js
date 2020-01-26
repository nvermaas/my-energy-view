
import React, {useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

export default function LifeView(props) {
    // react-hooks!!
    const [data, setData] = useState(undefined)
    const [timer, setTimer] = useState(undefined)

    const url = "http://"+props.host+"/my_energy/api/getlivedata"

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
            doPolling()
            setTimer(setInterval(() => doPolling(), 10000))

            // this function is automatically called when the component unmounts
            return function cleanup() {
                clearInterval(timer);
            }
        },[]
    );

    function doPolling() {
        fetchLiveData(url)
    }

    // get the data from the api
    const fetchLiveData = (API_URL) => {
        fetch(API_URL)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setData(data)
            })
    }

    let renderLiveInfo
    if (data!==undefined) {
        let PowerData = parseInt(data['data'].power_usage) - parseInt(data['data'].power_delivery)
        let CurrentSolar = (data['data'].current_power_growatt_label)
        let CurrentUsage = Math.round(data['data'].real_power_usage)

        renderLiveInfo =
            <div>
                <Card border="warning">
                    <Card.Header>
                        <Card.Title as="h5">LIVE - NET Power = {PowerData} W </Card.Title>
                        <div>Solar Panels = {CurrentSolar}, Consuming = {CurrentUsage} W</div>
                      </Card.Header>
                </Card>

            </div>
    }

    return (
        <div>
            {renderLiveInfo}
        </div>
    );
}
