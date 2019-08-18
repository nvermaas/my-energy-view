import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';

class App extends Component {

    constructor(props) {
        super(props);
        let my_status = "ready"

        // check of the host value is stored in the browser, if not, notify the user to configure it.
        let my_host = localStorage.getItem('MyEnergyServerIP');
        if (my_host==null) {
            alert("IP address of MyEnergyServer has not been set yet. Use 'configuration' button.")
            my_status = "do_config"
        }

        this.state = {
            host: my_host,
            status : my_status,
        }
    }

    render() {

        return (
        <div>
            <Main host={this.state.host} status = {this.state.status} />
        </div>
     )}
}

export default App;