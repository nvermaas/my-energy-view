import React, {createContext, useContext, useReducer} from 'react';
import './App.css';
import Main from './components/Main';
import { StateProvider  } from './MyGlobalStateProvider';
import { reducer } from './reducers/MyReducer';

// conditionally set some initial state
const myInitialState = () => {
    let my_status = "ready"
    // check of the host value is stored in the browser, if not, notify the user to configure it.
    let my_host = localStorage.getItem('MyEnergyServerIP');

    if (my_host == null) {
        alert("IP address of MyEnergyServer has not been set yet. Use 'configuration' button.")
        my_status = "do_config"
    }

    return {
        my_state : {
            host: my_host,
            status: my_status
        },
        presentation: "Net Electric Power",
        dataset: "Netto",
    }
}


export default function App() {
    const initialState = myInitialState()

    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <Main host={initialState.my_state.host} status = {initialState.my_state.status} />
        </StateProvider>
    );
}