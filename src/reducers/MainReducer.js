import { getDayStart, getDayEnd } from '../utils/DateUtils'
import { tickValues } from '../utils/common';

// possible actions
export const SET_MY_STATE = 'SET_MY_STATE'
export const SET_PRESENTATION = 'SET_PRESENTATION'
export const SET_PERIOD = 'SET_PERIOD'
export const SET_RESOLUTION = 'SET_RESOLUTION'

// the initial state
export const initialState = {
    presentation: "Gas",
    dataset: "Gas",
    period: "today",
    resolution: "Hour",
    from : getDayStart(new Date()),
    to : getDayEnd(new Date()),
    range : "Dag",
    ticks : tickValues["hour"],
}

// the reducer that handles the dispatched actions
export function MainReducer(state, action) {
    switch (action.type) {
        case SET_MY_STATE:
            return {
                ...state,
                presentation: action.presentation,
                period: action.period,
                resolution : action.resolution,
                to : action.to,
                from : action.from,
                range : action.range,
                ticks : action.ticks,
            }
        case SET_PRESENTATION:
            return {
                ...state,
                presentation: action.presentation,
                dataset: action.dataset,
            }
        case SET_PERIOD:
            alert('MainReducer.SET_PERIOD to '+action.period)
            return {
                ...state,
                period: action.period,
            }
        case SET_RESOLUTION:
            return {
                ...state,
                resolution : action.resolution
            }
        default:
            return initialState
    }
}