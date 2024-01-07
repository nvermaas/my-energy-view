/**
 * Created by Vermaas on 8/16/2019.
 */
import { getDaysBetween, getYearsBetween, getYear } from './DateUtils'

export const tickValues = {
    "hour" : ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
        "12", "13", "14", "15", "16", "17","18", "19", "20", "21", "22", "23"],
    "day" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "month" : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "years" : ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
}

export function createCustomTickvalues(from,to,resolution) {

    let tv=null
    if (resolution==='Day') {
        let days = getDaysBetween(from,to)
        tv = new Array(days)
        for (let i = 0; i < tv.length; i++) {
            tv[i] = i + 1
        }
    }

    if (resolution==='15MINUTES') {
        tv = new Array(24*4)
        for (let i = 0; i < tv.length; i++) {
            tv[i] = i + 1
        }
    }

    if (resolution==='5MINUTES') {
        tv = new Array(24*12)
        for (let i = 0; i < tv.length; i++) {
            tv[i] = i + 1
        }
    }

    if (resolution==='Year') {
        let year_start = parseInt(getYear(from))
        let year_end = parseInt(getYear(to))

        let years = year_end - year_start + 1

        tv = new Array(years)
        for (let i = 0; i < tv.length; i++) {
            tv[i] = (year_start-1 + i + 1).toString()
        }
    }
    return tv
}
