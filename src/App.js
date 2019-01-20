import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainScreen from './components/MainScreen';

//import my_data from '../assets/data.json';
var my_data = require('./assets/data.json');
const API_URL = "http://192.168.178.62/api/getseries?sn=15-49-002-081&from=2018-12-20&to=2018-12-21&resolution=Hour"

class App extends Component {

    // get the data from the api
    fetchData = () => {
        fetch(API_URL,{mode : 'no-cors'} )
            .then(results => {
                return results.json();
            })
            .then(data => {
                let myData = data;
                this.setState({fetchedData: myData})
                alert('data loaded')
                console.log("data loaded")
            })
        }

     // simulating the fetch with data from the assets folder
     readData = () => {
         this.setState({fetchedData: my_data})
     }

    // fetch the data
    componentWillMount() {
        console.log("componentWillMount()")
        // this.fetchData()
        this.readData()
    }

    render() {
        return (
            <div>
                <MainScreen data={this.state.fetchedData} />
            </div>
        );
    }
}

export default App;
