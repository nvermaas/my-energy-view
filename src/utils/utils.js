
function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

export function getLocalTime(date, timezone, extra_day) {

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

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

