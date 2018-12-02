import { combineReducers } from 'redux';
import FacialRecognition from './FacialRecognition.reducer'
import Weather from './Weather.reducer'

export default combineReducers({
    FacialRecognition,
    Weather,
});