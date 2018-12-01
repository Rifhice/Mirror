import actions from '../actions/FacialRecognition.action'

const defaultState = {
    isConnected: false,
    isStarted: false,
    status: "",
    faces: []
};

export default (state = defaultState, action = { type: null, payload: null }) => {
    switch (action.type) {
        case actions.UPDATE_FACIAL_RECOGNITION_STATUS:
            return {
                ...state,
                ...action.payload
            };
        case actions.UPDATE_FACIAL_RECOGNITION_FACES:
            return {
                ...state,
                faces: action.payload
            };
        default:
            return state
    }
}