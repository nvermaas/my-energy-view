import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Navbar, Jumbotron } from 'react-bootstrap';
import MainGraph from './components/MainGraph';
import PeriodButtonBar from './components/PeriodButtonBar';
import PresentationButtonBar from './components/PresentationButtonBar';

//import my_data from '../assets/data.json';
var my_data = require('./assets/data.json');

const API_BASE = "http://192.168.178.64/api/getseries"
const qbox_sn = "15-49-002-081"

var from = "2018-01-01"
var to = "2018-12-31"
var resolution = "Month"

var API_URL = API_BASE + "?sn=" + qbox_sn + "&from=" + from + "&to=" + to + "&resolution=" + resolution

class App extends Component {
    constructor(props) {
        super(props);
    }

    // get the data from the api
    fetchData = (API_URL) => {
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
                    presentation: 'Gas',
                    dataset : 'Gas',
                    status : 'fetched'})
            })
        }

     // simulating the fetch with data from the assets folder
     readData = () => {
         this.setState({fetchedData: my_data,
                        presentation: 'Gas',
                        dataset : 'Gas',
                        status  : 'fetched'})
     }


    handlePresentationChoice = (event) => {
        console.log(event)
        this.setState({
            presentation: event,
            dataset: event,
        });
    }

    handlePeriodChoice = (period) => {

        if (period='today') {
            resolution = 'Hour'
            API_URL = "http://192.168.178.64/api/getseries?sn=15-49-002-081&from=2019-01-25&to=2019-01-26&resolution=Hour"

            this.fetchData(API_URL)
        }

        if (period='year') {
            resolution = 'Month'
            API_URL = "http://192.168.178.64/api/getseries?sn=15-49-002-081&from=2018-01-01&to=2018-12-31&resolution=Month"

            this.fetchData(API_URL)
        }

        this.setState({
            period: period,
            resolution : resolution,
            dataset: period,
        });
    }

    handleResolutionChoice = (event) => {
        alert(event)
        this.setState({
            resolution: event,
            dataset: event,
        });
    }

    // fetch the data
    componentWillMount() {
        console.log("componentWillMount()")
        let API_URL = API_BASE + "?sn=" + qbox_sn + "&from=" + from + "&to=" + to + "&resolution=" + resolution

        this.fetchData(API_URL)
        //this.readData()   //read test data
    }

    render() {

        let renderGraph
        if (this.state.status=='fetched') {
            renderGraph = <MainGraph data={this.state.fetchedData}
                                     presentation={this.state.presentation}
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
                    <PeriodButtonBar handleChoice={this.handlePeriodChoice} />
                    <PresentationButtonBar handleChoice={this.handlePresentationChoice} />
                    {renderGraph}
                </Grid>
            </Jumbotron>
        </div>
        );
    }
}

export default App;
