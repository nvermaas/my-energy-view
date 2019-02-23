
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

const energyTypes = {
    "NetLow" : 0,
    "Consumption" : 1 ,
    "NetHigh" : 2,
    "Gas" : 3,
    "Generation" : 4}

const QserverIP = localStorage.getItem('QserverIP');
const qbox_sn = localStorage.getItem('QboxSN')
const API_URL_LIVE = "http://"+QserverIP+"/api/getlivedata?sn=" + qbox_sn


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
    //alert(this.state.fetchedLiveData)
    if (this.state.fetchedLiveData!=undefined) {
        let live_data = this.state.fetchedLiveData
        let NetLowData = live_data.data[energyTypes['NetLow']].power
        let NetHighData = live_data.data[energyTypes['NetHigh']].power
        let Netto = NetLowData + NetHighData
        let GasData = live_data.data[energyTypes['Gas']].power

        renderLiveInfo =
            <div>
                <Panel bsStyle="warning">
                    <Panel.Heading>
                        <Panel.Title componentClass="h5">Huidige verbruik: Gas = {GasData} m3/uur,  Stroom = {Netto} W/uur, </Panel.Title>

                    </Panel.Heading>
                </Panel>

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