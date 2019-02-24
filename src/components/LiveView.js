
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

const QserverIP = localStorage.getItem('QserverIP');
const API_URL_LIVE = "http://"+QserverIP+"/api/getlivedata"

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

    if (this.state.fetchedLiveData!=undefined) {
        let live_data = this.state.fetchedLiveData
        let PowerData = live_data['data'].power
        let GasData = live_data['data'].gas

        renderLiveInfo =
            <div>
                <Panel bsStyle="warning">
                    <Panel.Heading>
                        <Panel.Title componentClass="h5">LIVE: Gas = {GasData},  Power = {PowerData}, </Panel.Title>

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