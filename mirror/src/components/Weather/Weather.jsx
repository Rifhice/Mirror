import React, { Component } from 'react';
import { Loader, Label, Input } from 'semantic-ui-react'
import LanguageDetector from 'i18next-browser-languagedetector';
class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {
        await this.props.getWeather(this.props.config.location, this.props.config.metrics)
        setInterval(async () => {
            await this.props.getWeather(this.props.config.location, this.props.config.metrics)
        }, 3600000)
    }

    render() {
        const { t, i18n } = this.props;
        console.log(this.props.weather)
        return (
            <div>
                {
                    this.props.weather.description
                        ? <div>
                            <img src={`http://openweathermap.org/img/w/${this.props.weather.icon}.png`}></img>
                            <p>{this.props.weather.temp} C°</p>
                            <p>{this.props.weather.temp_min} C° - {this.props.weather.temp_max} C°</p>
                            <p>{`${this.props.weather.description[0].toUpperCase()}${this.props.weather.description.slice(1)}`}</p>
                        </div>
                        : <Loader active intermediate></Loader>
                }
            </div>
        );
    }
}

export default Weather;
