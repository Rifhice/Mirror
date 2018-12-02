import React, { Component } from 'react';
import { Loader, Label, Input } from 'semantic-ui-react'
import moment from 'moment'

class Time extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: moment()
        }
        setInterval(() => {
            this.setState({ time: moment() })
        }, 1000)
    }

    render() {
        const { t, i18n } = this.props;
        return (
            <div>
                {
                    this.state.time.format('LLLL').charAt(0).toUpperCase() + this.state.time.format('LLLL').slice(1)
                }
            </div>
        );
    }
}

export default Time;
