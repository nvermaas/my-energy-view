import moment from 'moment';

const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"]

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

export function getLocalDateTime(date, timezone, extra_year, extra_month, extra_day) {

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*timezone));

    var y = (nd.getFullYear()+extra_year).toString()
    var m = pad((nd.getMonth()+1+extra_month).toString(),2)
    var d = pad(((nd.getDate()+extra_day).toString()),2)
    var s = y+'-'+m+'-'+d

    // return time as a string
    return s;
}


/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
export function getDaysInMonth(month, year) {
    var date = new Date(year, month-1, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date).getDate());
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export function getYear(date) {
    let m = moment(date)
    return m.year()
}

export function getYearStart(date) {
    let m = moment(date)
    let start = m.startOf('year')
    return start.format('YYYY-MM-DD')
}

export function getYearEnd(date) {
    let m = moment(date)
    let end = m.endOf('year')
    return end.format('YYYY-MM-DD')
}

export function getMonth(date) {
    let m = moment(date)
    let month = m.month()
    let monthLabel = months[month]
    return monthLabel
}

export function getMonthStart(date) {
    let m = moment(date)
    let start = m.startOf('month')
    return start.format('YYYY-MM-DD')
}

export function getMonthEnd(date) {
    let m = moment(date)
    let end = m.endOf('month')
    return end.format('YYYY-MM-DD')
}

export function getWeek(date) {
    let m = moment(date)
    let week = m.week()
    return week
}

export function getWeekStart(date) {
    let m = moment(date)
    let start = m.startOf('week')
    return start.format('YYYY-MM-DD')
}

export function getWeekEnd(date) {
    let m = moment(date)
    let end = m.endOf('week').add('1','days')
    return end.format('YYYY-MM-DD')
}

export function getDate(date) {
    let m = moment(date)
    return m.format("dddd, MMMM Do YYYY")
}

export function getToday(date) {
    let m = moment(date)
    return m.format('YYYY-MM-DD')
}

export function getDayStart(date) {
    let m = moment(date)
    let start = m.startOf('day')
    return start.format('YYYY-MM-DD')
}

export function getDayEnd(date) {
    let m = moment(date)
    let end = m.add(1,'days').startOf('day')
    return end.format('YYYY-MM-DD')
}

export function goBackInTime(date, interval) {
    //alert('goBackInTime(' + date + ',' + interval + ')')

    // see http://momentjs.com/
    let m = moment(date)
    let newDate

    if (interval==='Dag') {
        newDate = m.subtract(1,'days').format('YYYY-MM-DD')
    } else
    if (interval==='Week') {
        newDate = m.subtract(7,'days').format('YYYY-MM-DD')
    } else
    if (interval==='Maand') {
        newDate = m.subtract(1,'months').format('YYYY-MM-DD')
    } else
    if (interval==='Jaar') {
        newDate = m.subtract(1,'year').format('YYYY-MM-DD')
    }
    return newDate
}

export function goForwardInTime(date, interval) {
    //alert('goForwardInTime(' + date + ',' + interval + ')')

    // see http://momentjs.com/
    let m = moment(date)
    let newDate

    if (interval==='Dag') {
        newDate = m.add(1,'days').format('YYYY-MM-DD')
    } else
    if (interval==='Week') {
        newDate = m.add(7,'days').format('YYYY-MM-DD')
    } else
    if (interval==='Maand') {
        newDate = m.add(1,'months').format('YYYY-MM-DD')
    } else
    if (interval==='Jaar') {
        newDate = m.add(1,'year').format('YYYY-MM-DD')
    }
    return newDate
}