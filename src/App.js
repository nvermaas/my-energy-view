import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';

// conditionally set some initial state
const initialState = () => {
    let my_status = "ready"
    // check of the host value is stored in the browser, if not, notify the user to configure it.
    let my_host = localStorage.getItem('MyEnergyServerIP');
    if (my_host == null) {
        alert("IP address of MyEnergyServer has not been set yet. Use 'configuration' button.")
        my_status = "do_config"
    }

    return {
        host: my_host,
        status: my_status
    }
}

export default function App() {
    let my_state = initialState()

    return (
        <div>
            <Main host={my_state.host} status = {my_state.status} />
        </div>
     )
}
