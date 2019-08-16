
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

const MyEnergyServerIP = localStorage.getItem('MyEnergyServerIP');
const API_URL_LIVE = "http://"+MyEnergyServerIP+"/my_energy/api/getlivedata"

class LiveView extends Component {

    constructor(props) {
        super(props);

        this.state = {
             status : 'idle'
        }
    }

    // get the data from the api
    fetchLiveData = (API_URL) => {
        //alert('fetchLiveData: '+(API_URL))
        this.setState({
            status: 'fetching_live_data',
        })
        fetch(API_URL)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({
                    fetchedLiveData: data,
                    status : 'fetched_live_data'})
            })
            .catch(function() {
                 //alert("fetch to "+API_URL+ " failed.");
            })
    }

    componentWillMount() {
         this.fetchLiveData(API_URL_LIVE)
    }

    componentDidMount() {
        this.timer = setInterval(() => this.doPolling(), 30000)
    }

    componentWillUnmount () {
        // use intervalId from the state to clear the interval
        clearInterval(this.timer)
    }

    doPolling() {
        this.fetchLiveData(API_URL_LIVE)
    }

render() {

    let renderLiveInfo

    if (this.state.fetchedLiveData!==undefined) {
        let live_data = this.state.fetchedLiveData
        let PowerData = parseInt(live_data['data'].power_usage) - parseInt(live_data['data'].power_delivery)
        //let GasData = live_data['data'].gas

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
}
export default LiveView;