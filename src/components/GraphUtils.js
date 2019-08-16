
import {getYear, getMonthName, getFullDate, getWeek} from '../utils/DateUtils'

export function getMax(items) {
    let item = items[0]
    let max = item.value

    for (var i = 0; i < items.length; i++) {
        if (items[i].value > max) {
            max = items[i].value
        }
    }
    return max
}

export function getScale(data, range) {
    let scale = 1
    if (data.length > 48) {
        scale = 10
    } else
    if (data.length === 24) {
        scale = 40
    } else
    if (data.length === 7) {
        scale = 100
    }

    let scale_calc = (Math.round(range / 300)+1) * 10

    if (range <1000) {
        scale = 20
    } else
    if (range < 2000) {
        scale = 40
    } else
    if (range < 3000) {
        scale = 60
    } else
    if (range < 5000) {
        scale = 100
    } else
    if (range < 10000) {
        scale = 200
    } else
    if (range < 20000) {
        scale = 400
    } else {
        scale = 8000
    }
    // depending on the dimensions of the domain of the main graph, the secondary domain must be scaled

    //alert('range '+range+' => scale '+scale+' (calc = '+scale_calc+')')
    return scale
}

export function fillYAxis(data, negative, factor) {
    let items = []
    for (var i = 0; i < data.length; i++) {
        let item = {}
        item.x = i+1;
        if (negative==true) {
            item.value = parseInt(data[i]) * -1
        } else {
            item.value = data[i]
        }
        item.value = item.value * factor
        items.push(item)
        //alert(items.value)
    }
    return items
}

export function constructSubTitle(props) {
    let title = props.presentation
    return title
}

export function constructTitle(props, extra_title='') {
    let title = extra_title + props.from + ' - ' + props.to

    if (props.range === 'Jaar') {
        let year = getYear(props.from)
        title = year

    } else if (props.range === 'Maand') {
        let year = getYear(props.from)
        let month = getMonthName(props.from)
        title = month + ' ' + year
    }

    if (props.range === 'Week') {
        let year = getYear(props.from)
        let week = getWeek(props.from)
        title = 'Week ' + week + ', ' + year
    }

    if (props.range === 'Dag') {
        title = getFullDate(props.from)
    }

    return title
}