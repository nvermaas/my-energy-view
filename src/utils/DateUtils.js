import moment from 'moment';

const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"]

export function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

export function getYear(date) {
    let m = moment(date)
    return m.year()
}

export function getMonth(date) {
    let m = moment(date)
    return m.month()+1
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

export function getMonthName(date) {
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
    let end = m.endOf('month').add('1','days')
    return end.format('YYYY-MM-DD')
}

export function getWeek(date) {
    let m = moment(date)
    let week = m.week()
    return week
}

export function addDays(date,numberOfDays) {
    let m = moment(date)
    let added = m.add(numberOfDays, 'days')
    return added.format('YYYY-MM-DD')
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

export function getFullDate(date) {
    let m = moment(date)
    return m.format("dddd, MMMM Do YYYY")
}

export function getDate(date) {
    let m = moment(date)
    return m.format('YYYY-MM-DD')
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

export function getDaysBetween(date1, date2) {
    // Convert both dates to milliseconds
    var d1 = new Date(date1)
    var d2 = new Date(date2)
    var one_day=1000*60*60*24;
    var date1_ms = d1.getTime();
    var date2_ms = d2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    var d = Math.round(difference_ms/one_day);

    return d

}

export function getYearsBetween(date1, date2) {
    // Convert both dates to milliseconds
    var d1 = new Date(date1)
    var d2 = new Date(date2)
    alert(d1)
    var one_day=1000*60*60*24;
    var date1_ms = d1.getTime();
    var date2_ms = d2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    var d = Math.round(difference_ms/one_day);

    return d

}

export function getDaysInMonth(date) {
    let m = moment(date)
    return m.daysInMonth();
}