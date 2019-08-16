
import React, {useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const MyEnergyServerIP = localStorage.getItem('MyEnergyServerIP');
const API_URL_LIVE = "http://"+MyEnergyServerIP+"/my_energy/api/getlivedata"

export default function LifeView() {
    const [data, setData] = useState(undefined)
    const [timer, setTimer] = useState(undefined)

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
            doPolling()
            setTimer(setInterval(() => doPolling(), 10000))

            return function cleanup() {
                clearInterval(timer);
            }
        },[]
    );

    function doPolling() {
        fetchLiveData(API_URL_LIVE)
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

        renderLiveInfo =
            <div>
                <Card border="warning">
                    <Card.Header>
                        <Card.Title as="h5">LIVE Power = {PowerData} </Card.Title>
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
