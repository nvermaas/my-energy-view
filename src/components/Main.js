import React, {useState, useEffect, useReducer }  from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';

import { MainReducer, initialState,
    SET_PERIOD,
    SET_PRESENTATION,
    SET_MY_STATE }
    from '../reducers/MainReducer'

import MainGraph from './MainGraph';
import HeaderPanel from './HeaderPanel';
import LiveView from './LiveView';
import PeriodPanel from './PeriodPanel';
import PresentationPanel from './PresentationPanel';
import StatusPanel from './StatusPanel';
import LoadingSpinner from './LoadingSpinner';
import {pad, getYearStart, getYearEnd, getMonthStart, getMonthEnd, getWeekStart, getWeekEnd, getYear, getMonth,
    addDays, getDayStart, getDayEnd, goBackInTime, goForwardInTime } from '../utils/DateUtils'
import { tickValues, createCustomTickvalues } from '../utils/common';


export default function Main(props) {
    // state in hooks

    // my_state is the object that contains all the props that are maintained by my MainReducer
    // my_dispatch is the function that sends actions to the MainReducer
    const [my_state, my_dispatch] = useReducer(MainReducer, initialState)

    // these pieces of state come from the App
    const [status, setStatus] = useState(props.status)
    const [host, setHost] = useState(props.host)
    const [url, setUrl] = useState("http://"+host+"/my_energy/api/getseries?from=" + my_state.from + "&to=" + my_state.to + "&resolution=" + my_state.resolution)

    const [fetchedData, setFetchedData] = useState('ready')
    const [timer, setTimer] = useState(undefined)


    // the '[url]' parameter means that this effect will be executed whenever the 'url' state changes.
    // This effectivly means the data is fetched when setUrl(..) is called
    useEffect(() => {
            fetchData(url)
        },[url]
    );

    // Similar to componentDidMount and componentDidUpdate:
    // executed only once (thanks to the empty [] argument
    useEffect(() => {
            setTimer(setInterval(() => fetchData(url), 300000))

            // this function is automatically called when the component unmounts
            return function cleanup() {
                clearInterval(timer);
            }
        },[]
    );


    // get the data from the api
    const fetchData = (url) => {
        if ((status !== 'fetching') && (status !== 'do_config')) {
            console.log('fetchData: ' + (url))
            setStatus('fetching')
            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    setFetchedData(data)
                    setStatus('fetched')
                })
                .catch(function () {
                    setStatus('failed')
                    alert("fetch to " + url + " failed.");
                })
        }
    }


    // this function is called when the IP address is changed in the configuration screen
    const handleConfigChange = (newHost) => {
        let newUrl = "http://"+newHost+"/my_energy/api/getseries?from=" + my_state.from + "&to=" + my_state.to + "&resolution=" + my_state.resolution
        setHost(newHost)
        setStatus("ready")
        setUrl(newUrl)
    }

    // this function is called when the presentation choice changes (gas, power, etc)
    const handlePresentationChoice = (presentation, dataset) => {
        // dispatch to the (local) reducer)
        my_dispatch({type: SET_PRESENTATION, presentation: presentation, dataset: dataset})
    }

    // this function is called when a bar n the graph is clicked
    // depending on the 'range' it will zoom into the next range (year, month, day)
    const handleZoom = (i) => {
        let newRange = my_state.range
        let newFrom = my_state.from
        let newTo = my_state.to
        let newResolution = my_state.resolution
        let newTicks = my_state.ticks

        // only range year, month and day are valid, because for custom ranges it is not known
        // to which month, day the 'index' points when clicking a bar
        if (my_state.range === 'custom') {
            return
        }


        // clicked on a month bar in a Year overview
        if (my_state.resolution === 'Month') {
            newRange = "Maand"

            let month = i+1
            let year = getYear(newFrom).toString()
            newFrom = getMonthStart(year + '-' + pad((month).toString(), 2) + '-01')
            newTo = getMonthEnd(newFrom)
            newResolution = "Day"
            newTicks = createCustomTickvalues(newFrom, newTo, newResolution)
        } else

        // clicked on a month bar in a Year overview
        if (my_state.resolution === 'Month') {
            newRange = "Maand"

            let month = i+1
            let year = getYear(newFrom).toString()
            newFrom = getMonthStart(year + '-' + pad((month).toString(), 2) + '-01')
            newTo = getMonthEnd(newFrom)
            newResolution = "Day"
            newTicks = createCustomTickvalues(newFrom, newTo, newResolution)
        } else

        if (my_state.resolution === 'Day') {
            if (my_state.range==='Week') {
                // clicked on a day bar in a week overview
                newFrom = addDays(newFrom,i)
                newTo = addDays(newFrom,1)

            } else {
                // clicked on a day bar in a month overview
                let day = i+1
                let year = getYear(my_state.from).toString()
                let month = pad(getMonth(my_state.from).toString(),2)
                newFrom = year + '-' + month+ '-'+pad((day).toString(), 2)
                newTo = year + '-' + month+ '-'+pad((day+1).toString(), 2)

            }
            newRange = "Dag"
            newResolution = "Hour"
            newTicks = tickValues["hour"]
        }

        // clicked on a day bar in a month overview
        if (my_state.resolution === 'Hour') {
            newResolution = "15MINUTES"
        }

        // clicked on a day bar in a month overview
        if (my_state.resolution === '15MINUTES') {
            newTicks = tickValues["hour"]
            newResolution = "Hour"
        }

        my_dispatch({type: SET_MY_STATE,
            presentation: my_state.presentation,
            period: "custom",
            resolution : newResolution,
            from : newFrom,
            to : newTo,
            range : newRange,
            ticks : newTicks
        })

        // this triggers a new fetch because the 'url' state is mapped to an effect hook that fetches the data
        let newUrl = "http://"+host+"/my_energy/api/getseries?from=" + newFrom + "&to=" + newTo + "&resolution=" + newResolution
        setUrl(newUrl)
    }

    // this function is called when a custom specific period choice is made
    const handleChangeDate = (from, to) => {
        my_dispatch({type: SET_MY_STATE,
            presentation: my_state.presentation,
            period: "custom",
            resolution : "Day",
            from : from,
            to : to,
            range : "custom",
            ticks : createCustomTickvalues(from,to,my_state.resolution)
        })

        // this triggers a new fetch because the 'url' state is mapped to an effect hook that fetches the data
        setUrl("http://"+host+"/my_energy/api/getseries?from=" + from + "&to=" + to + "&resolution=" + my_state.resolution)
    }


    // this function is called when a different time period is selected.
    // it then also does a new fetch of the data.
    const handlePeriodChoice = (newPeriod) => {

        if (newPeriod==='test') {
            my_dispatch({type: SET_PERIOD, period: 'test'})
            return
        }

        let newFrom = my_state.from
        let newTo = my_state.to
        let newRange = my_state.range
        let newResolution = my_state.resolution
        let newTicks

        if (newPeriod==='years') {
            newFrom = getYearStart(new Date("01-01-2018"))
            console.info(newFrom)
            newTo = getYearEnd(new Date())
            newRange = "years"
            newResolution = "Year"
            //newTicks = tickValues["years"]

            //newTicks = null
            newTicks = createCustomTickvalues(newFrom, newTo, newResolution)
        }

        if (newPeriod==='all_months') {
            newFrom = getYearStart(new Date("01-01-2018"))
            console.info(newFrom)
            newTo = getYearEnd(new Date())
            newRange = "years"
            newResolution = "Month"
            newTicks = tickValues["year"]
        }

        if (newPeriod==='this_year') {
            newFrom = getYearStart(new Date())
            newTo = getYearEnd(new Date())
            newRange = "Jaar"
            newResolution = "Month"
            newTicks = tickValues["month"]
        }

        if (newPeriod==='this_month') {
            newFrom = getMonthStart(new Date())
            newTo   = getMonthEnd(new Date())
            newRange = "Maand"
            newResolution = "Day"
            newTicks = null
            newTicks = createCustomTickvalues(newFrom, newTo, newResolution)
        }

        if (newPeriod==='this_week') {
            newFrom = getWeekStart(new Date())
            newTo   = getWeekEnd(new Date())
            newRange = "Week"
            newResolution = "Day"
            newTicks = tickValues["day"]
        }

        if (newPeriod==='today') {
            newFrom = getDayStart(new Date())
            newTo   = getDayEnd(new Date())
            newRange = "Dag"
            newResolution = "Hour"
            newTicks = tickValues["hour"]
        }

        // depending go back 1 '_resolution
        if (newPeriod==='back') {
            newFrom = goBackInTime(my_state.from,my_state.range)
            newTo   = goBackInTime(my_state.to,my_state.range)
            newTicks = my_state.ticks
            if (my_state.range==='Maand') {
                newTo = getMonthStart(my_state.from)
                newTicks = createCustomTickvalues(newFrom, newTo, my_state.resolution)
            }
        }

        // depending go back 1 '_resolution
        if (newPeriod==='forward') {
            newFrom = goForwardInTime(my_state.from,my_state.range)
            newTo   = goForwardInTime(my_state.to,my_state.range)
            newTicks = my_state.ticks
            if (my_state.range==='Maand') {
                newTicks = createCustomTickvalues(newFrom, newTo, my_state.resolution)
            }
        }

        // dispatch the new settings to the reducer
        my_dispatch({type: SET_MY_STATE,
            presentation: my_state.presentation,
            period: newPeriod,
            resolution : newResolution,
            from : newFrom,
            to : newTo,
            range : newRange,
            ticks : newTicks
        })

        let newUrl = "http://"+host+"/my_energy/api/getseries?from=" + newFrom + "&to=" + newTo + "&resolution=" + newResolution
        // this triggers a new fetch because the 'url' state is mapped to an effect hook that fetches teh data
        setUrl(newUrl)
    }

    let renderGraph
    let renderConfiguration

    // conditional render, only render the GUI when there is data fetched.
    if (status==='fetched') {
        renderGraph = <MainGraph presentation = {my_state.presentation}
                                 range = {my_state.range}
                                 from = {my_state.from}
                                 to = {my_state.to}
                                 fetchedData = {fetchedData}
                                 tickValues = {my_state.ticks}
                                 dataset = {my_state.dataset}
                                 handleZoom={handleZoom}/>
    }

    const loading = status === 'fetching'
    // <Col xs={4} md={4} sm={2}>

    return (
        <div>

            <Jumbotron>
                <Container fluid>
                    <Row className="show-grid">
                        <Col lg={true}>
                            <HeaderPanel/>

                            &nbsp;
                            <PeriodPanel
                                from={my_state.from}
                                to={my_state.to}
                                range={my_state.range}
                                resolution={my_state.resolution}
                                handleChoice={handlePeriodChoice}
                                handleChangeDate={handleChangeDate}
                            />
                            &nbsp;
                            <PresentationPanel handleChoice={handlePresentationChoice} />
                            &nbsp;
                            <LiveView host={host} />
                            &nbsp;
                            <StatusPanel url = {url}
                                         presentation = {my_state.presentation}
                                         dataset = {my_state.dataset}
                                         status = {status}
                                         to = {my_state.to}
                                         from = {my_state.from}
                                         resolution = {my_state.resolution}
                                         period = {my_state.period}
                                         range = {my_state.range}
                                         handleConfigChange={handleConfigChange}
                                        />

                        </Col>
                        <Col xs={14} md={8} sm={4}>
                            {loading ? <LoadingSpinner /> :
                                <div>
                                    {renderConfiguration}
                                    {renderGraph}
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <small> (C) 2019 - Nico Vermaas - version 1 Jun 2024</small>
        </div>
    );
}
