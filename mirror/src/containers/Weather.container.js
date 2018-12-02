import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Weather from '../components/Weather';
import axios from 'axios'
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';
import actions from '../redux/actions/Weather.action'

const mapStateToProps = (state, ownProps) => {
    return {
        weather: state.Weather
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async getWeather(location, metrics) {
            try {
                const current = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${metrics}&lang=${navigator.languages[1]}&APPID=${global.config.WEATHER_API_KEY}`)
                const forecast = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=${metrics}&lang=${navigator.languages[1]}&APPID=${global.config.WEATHER_API_KEY}&cnt=1`)
                const { min, max } = forecast.data.list[0].temp
                const { description, icon } = forecast.data.list[0].weather[0]
                const { temp, pressure } = current.data.main
                dispatch({
                    type: actions.FETCHED_WEATHER_DATA, payload: {
                        temp: Math.round(temp), temp_min: Math.round(min), temp_max: Math.round(max), pressure, description, icon
                    }
                })
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}

export default withNamespaces('translation')(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather)));