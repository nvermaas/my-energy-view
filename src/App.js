import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Navbar, Jumbotron } from 'react-bootstrap';
import MainGraph from './components/MainGraph';
import ButtonBar from './components/ButtonBar';

//import my_data from '../assets/data.json';
var my_data = require('./assets/data.json');
const API_URL = "http://192.168.178.64/api/getseries?sn=15-49-002-081&from=2018-01-01&to=2018-12-31&resolution=Month"


class App extends Component {
    constructor(props) {
        super(props);
    }

    // get the data from the api
    fetchData = () => {
        this.setState({
            status: 'fetching',
        })
        fetch(API_URL)
            .then(results => {
                return results.json();
            })
            .then(data => {
                let myData = data;
                this.setState({
                    fetchedData: myData,
                    dataset : 'Gas',
                    status : 'fetched'})
            })
        }

     // simulating the fetch with data from the assets folder
     readData = () => {
         this.setState({fetchedData: my_data,
                        dataset : 'Gas',
                        status  : 'fetched'})
     }


    handleChoice = (event) => {
        console.log(event)
        this.setState({
            dataset: event,
        });
    }

    // fetch the data
    componentWillMount() {

        console.log("componentWillMount()")
        this.fetchData()
        //this.readData()   //read test data

    }

    componentDidMount() {
        console.log("componentDidMount()")
    }

    render() {

        let renderGraph
        if (this.state.status=='fetched') {
            renderGraph = <MainGraph data={this.state.fetchedData}
                                     dataset={this.state.dataset} />
        }

        return (
        <div>
            <Navbar inverse fixedTop>
                <Grid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            QboxView 1.0 (23 jan 2019)
                        </Navbar.Brand>

                    </Navbar.Header>
                </Grid>
            </Navbar>
            <Jumbotron>
                <Grid>
                    <ButtonBar handleChoice={this.handleChoice} />
                    {renderGraph}
                </Grid>
            </Jumbotron>
        </div>
        );
    }
}

export default App;
