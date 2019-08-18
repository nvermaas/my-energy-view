import React, {useState, useEffect }  from 'react';

import { Container, Jumbotron, Row, Col } from 'react-bootstrap';

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
    // state in hoooks
    const [presentation, setPresentation] = useState('Gas')
    const [dataset, setDataset] = useState('Gas')
    const [period, setPeriod] = useState('today')
    const [from, setFrom] = useState(getDayStart(new Date()))
    const [to, setTo] = useState(getDayEnd(new Date()))
    const [range, setRange] = useState("Dag")
    const [resolution, setResolution] = useState("Hour")
    const [ticks, setTicks] = useState(tickValues["hour"])
    const [status, setStatus] = useState(props.status)

    const [host, setHost] = useState(props.host)
    const [url, setUrl] = useState("http://"+host+"/my_energy/api/getseries?from=" + from + "&to=" + to + "&resolution=" + resolution)

    const [fetchedData, setFetchedData] = useState('underfined')
    const [timer, setTimer] = useState(undefined)

    // the '[url]' parameter means that this effect will be executed whenever the 'url' state changes.
    // This effectivly means the data is fetched when setUrl(..) is called
    useEffect(() => {
            fetchData(url)
        },[url]
    );

    // Similar to componentDidMount and componentDidUpdate:
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
        let newUrl = "http://"+newHost+"/my_energy/api/getseries?from=" + from + "&to=" + to + "&resolution=" + resolution
        setHost(newHost)
        setStatus("ready")
        setUrl(newUrl)
    }

    // this function is called when the presentation choice changes (gas, power, etc)
    const handlePresentationChoice = (presentation, dataset) => {
        setPresentation(presentation)
        setDataset(dataset)
    }


    // this function is called when a bar n the graph is clicked
    // depending on the 'range' it will zoom into the next range (year, month, day)
    function handleZoom(i) {
        let newRange = range
        let newFrom = from
        let newTo = to
        let newResolution = resolution
        let newTicks = ticks

        // only range year, month and day are valid, because for custom ranges it is not known
        // to which month, day the 'index' points when clicking a bar
        if (range === 'custom') {
            return
        }

        // clicked on a month bar in a Year overview
        if (resolution === 'Month') {
            newRange = "Maand"

            let month = i+1
            let year = getYear(newFrom).toString()
            newFrom = getMonthStart(year + '-' + pad((month).toString(), 2) + '-01')
            newTo = getMonthEnd(newFrom)
            newResolution = "Day"
            newTicks = createCustomTickvalues(newFrom, newTo, newResolution)
        } else

        if (resolution === 'Day') {

            if (range==='Week') {
                // clicked on a day bar in a week overview
                newFrom = addDays(newFrom,i)
                newTo = addDays(newFrom,1)

            } else {
                // clicked on a day bar in a month overview
                let day = i+1
                let year = getYear(from).toString()
                let month = pad(getMonth(from).toString(),2)
                newFrom = year + '-' + month+ '-'+pad((day).toString(), 2)
                newTo = year + '-' + month+ '-'+pad((day+1).toString(), 2)

            }
            newRange = "Dag"
            newResolution = "Hour"
            newTicks = tickValues["hour"]
        }

        // clicked on a day bar in a month overview
        if (resolution === 'Hour') {
            //alert('Dieper inzoomen is nog niet mogelijk.')
            newResolution = "15MINUTES"
        }

        // clicked on a day bar in a month overview
        if (resolution === '15MINUTES') {
            //alert('Dieper inzoomen is nog niet mogelijk.')
            newTicks = tickValues["hour"]
            newResolution = "Hour"
        }

        setFrom(newFrom)
        setTo(newTo)
        setResolution(newResolution)
        setTicks(newTicks)
        setRange(newRange)

        let newUrl = "http://"+host+"/my_energy/api/getseries?from=" + newFrom + "&to=" + newTo + "&resolution=" + newResolution
        // this triggers a new fetch
        setUrl(newUrl)
    }


    // this function is called when the period choices change
    const handleChangeDate = (from, to) => {
        //alert('app.handleChangeDate:' +from+','+to)

        // make this changable later
        setResolution("Day")
        setFrom(from)
        setTo(to)
        setPeriod("custom")
        setRange("custom")
        setTicks(createCustomTickvalues(from,to,resolution))

        // this triggers a new fetch because the 'url' state is mapped to an effect hook that fetches teh data
        setUrl("http://"+host+"/my_energy/api/getseries?from=" + from + "&to=" + to + "&resolution=" + resolution)
    }


    // this function is called when a different time period is selected.
    // it then also does a new fetch of the data.
    const handlePeriodChoice = (newPeriod) => {
        // load the state in temp variables
        //alert('(1) '+url)
        if (newPeriod==='test') {
            setUrl('')
            const my_url = "http://"+host+"/my_energy/api/getseries?from=" + from + "&to=" + to + "&resolution=" + resolution
            setUrl(my_url)
            return
        }

        let _from = from
        let _to = to
        let _range = range
        let _resolution = resolution
        let _tv

        if (newPeriod==='this_year') {
            _from = getYearStart(new Date())
            _to = getYearEnd(new Date())
            _range = "Jaar"
            _resolution = "Month"
            _tv = tickValues["month"]
        }

        if (newPeriod==='this_month') {
            _from = getMonthStart(new Date())
            _to   = getMonthEnd(new Date())
            _range = "Maand"
            _resolution = "Day"
            _tv = null
            _tv = createCustomTickvalues(_from, _to, _resolution)
        }

        if (newPeriod==='this_week') {
            _from = getWeekStart(new Date())
            _to   = getWeekEnd(new Date())
            _range = "Week"
            _resolution = "Day"
            _tv = tickValues["day"]
        }

        if (newPeriod==='today') {
            _from = getDayStart(new Date())
            _to   = getDayEnd(new Date())
            _range = "Dag"
            _resolution = "Hour"
            _tv = tickValues["hour"]
        }

        // depending go back 1 '_resolution
        if (newPeriod==='back') {
            _from = goBackInTime(from,range)
            _to   = goBackInTime(to,range)
            _tv = ticks
            if (range==='Maand') {
                _to = getMonthStart(from)
                _tv = createCustomTickvalues(_from, _to, resolution)
            }
        }

        // depending go back 1 '_resolution
        if (newPeriod==='forward') {
            _from = goForwardInTime(from,range)
            _to   = goForwardInTime(to,range)
            _tv = ticks
            if (range==='Maand') {
                _tv = createCustomTickvalues(_from, _to, resolution)
            }
        }

        setFrom(_from)
        setTo(_to)
        setPeriod(newPeriod)
        setRange(_range)
        setResolution(_resolution)
        setTicks(_tv)

        let newUrl = "http://"+host+"/my_energy/api/getseries?from=" + _from + "&to=" + _to + "&resolution=" + _resolution
        // this triggers a new fetch because the 'url' state is mapped to an effect hook that fetches teh data
        setUrl(newUrl)
    }

    let renderGraph
    let renderConfiguration

    // conditional render, only render the GUI when there is data fetched.
    if (status==='fetched') {
        renderGraph = <MainGraph presentation = {presentation}
                                 range = {range}
                                 from = {from}
                                 to = {to}
                                 fetchedData = {fetchedData}
                                 tickValues = {ticks}
                                 dataset = {dataset}
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
                                from={from}
                                to={to}
                                range={range}
                                resolution={resolution}
                                handleChoice={handlePeriodChoice}
                                handleChangeDate={handleChangeDate}
                            />
                            &nbsp;
                            <PresentationPanel handleChoice={handlePresentationChoice} />
                            &nbsp;
                            <LiveView host={host} />
                            &nbsp;
                            <StatusPanel url = {url}
                                         status = {status}
                                         to = {to}
                                         from = {from}
                                         resolution = {resolution}
                                         period = {period}
                                         range = {range}
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
            <small> (C) 2019 - Nico Vermaas - version 1.5.0 - 17 feb 2019</small>
        </div>
    );
}
