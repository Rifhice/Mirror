import actions from '../actions/Weather.action'

const defaultState = {

};

export default (state = defaultState, action = { type: null, payload: null }) => {
    switch (action.type) {
        case actions.FETCHED_WEATHER_DATA:
            return {
                ...state.weather,
                ...action.payload
            };
        default:
            return state
    }
}