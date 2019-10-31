// Nico Vermaas - aug 2019
// This is the reducer for the global state providor.
// not used, because I always want to render the main component when one of the child components changes state,
// so I have to provide callback functions anyway. The react hooks and useReducer methodology that I use now in
// Main.js is indeed the way to go. I leave this MyReducer as an artifact and example of how to do global state
// if needed.

export const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_HOST':
            return {
                ...state,
                my_state: action.newHostStatus
            };

        case 'SET_PRESENTATION':
            alert('reducer:'+action.newPresentation.presentation)
            return {
                ...state,
                presentation: action.newPresentation.presentation,
                dataset: action.newPresentation.dataset,
            }
        default:
            return state;
    }
};