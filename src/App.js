import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Navbar, Jumbotron } from 'react-bootstrap';
import Status from './components/Status';
import MainGraph from './components/MainGraph';
import PeriodButtonBar from './components/PeriodButtonBar';
import PresentationButtonBar from './components/PresentationButtonBar';
import ResolutionButtonBar from './components/ResolutionButtonBar';

//import my_data from '../assets/data.json';
var my_data = require('./assets/data.json');

const API_BASE = "http://192.168.178.64/api/getseries"
const qbox_sn = "15-49-002-081"

var from = "2018-01-01"
var to = "2018-12-31"
var resolution = "Month"

var API_URL = API_BASE + "?sn=" + qbox_sn + "&from=" + from + "&to=" + to + "&resolution=" + resolution

const tickValues = {
    "hour" : ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
              "12", "13", "14", "15", "16", "17","18", "19", "20", "21", "22", "23"],
    "month" : ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]

}

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month, year) {
    var date = new Date(year, month-1, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date).getDate());
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function getLocalTime(d, timezone, extra_day) {

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*timezone));

    var y = nd.getFullYear().toString()
    var m = pad((nd.getMonth()+1).toString(),2)
    var d = pad(((nd.getDate()+extra_day).toString()),2)
    var s = y+'-'+m+'-'+d

    // return time as a string
    return s;
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            presentation: 'Gas',
            dataset : 'Gas',
            period : "2018",
            resolution : "month",
            tickValues : tickValues["month"],
            status : 'idle'}
    }

    // get the data from the api
    fetchData = (API_URL) => {
        //alert(API_URL)
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

    // this function is called when the presentation choice changes (gas, stroom, netto, etc)
    handlePresentationChoice = (presentation) => {
        console.log(presentation)
        this.setState({
            presentation: presentation,
            dataset: presentation,
        });
    }

    // this function is called when a different time period is selected.
    // it then also does a new fetch of the data.
    handlePeriodChoice = (period) => {

        let from
        let to
        let resolution
        let tv

        if (period=='today') {
            from = getLocalTime(new Date(),1,0)
            to   = getLocalTime(new Date(),1,1)
            resolution = "Hour"
            tv = tickValues["hour"]
        }

        if (period=='this_month') {
            from = "2019-01-01"
            to   = "2019-01-31"
            resolution = "Day"
            tv = getDaysInMonth(1,2019)
        }

        if (period=='2018') {
            from = "2018-01-01"
            to   = "2018-12-31"
            resolution = "Month"
            tv = tickValues["month"]
        }

        if (period=='2019') {
            from = "2019-01-01"
            to   = "2019-12-31"
            resolution = "Month"
            tv = tickValues["month"]

        }


        API_URL = API_BASE + "?sn=" + qbox_sn +
            "&from=" + from +
            "&to=" + to +
            "&resolution=" + resolution

        this.fetchData(API_URL)

        this.setState({
            from       : from,
            to         : to,
            period     : period,
            resolution : resolution,
            tickValues : tv,
        })
    }

    // this function is called when the resolution has changed (Month, Day, Hour)
    // the x-axis labels (tickValues) should change accordingly
    handleResolutionChoice = (resolution) => {
        this.setState({
            resolution: resolution,
            tickValues: tickValues[resolution],
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
                                     dataset={this.state.dataset}
                                     tickValues = {this.state.tickValues} />
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
                    <Status presentation={this.state.presentation}
                            period={this.state.period}
                            resolution={this.state.resolution} />
                    <PeriodButtonBar handleChoice={this.handlePeriodChoice} />
                    <PresentationButtonBar handleChoice={this.handlePresentationChoice} />
                    {renderGraph}
                    <ResolutionButtonBar handleChoice={this.handleResolutionChoice} />
                </Grid>
            </Jumbotron>
        </div>
        );
    }
}

export default App;
