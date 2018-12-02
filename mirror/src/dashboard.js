import React, { Component } from 'react';
import './App.css';
import { Grid, Image } from 'semantic-ui-react'
import Recognizer from './containers/Recognizer.container'
import ModuleHandler from './ModuleHandler'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            config: {
                "max-width": 4,
                "max-height": 8,
                "modules": {
                    "default/time/1": {
                        "x": 0,
                        "y": 0,
                        "width": 4,
                        "height": 1,
                        "config": {}
                    },
                    "default/weather/2": {
                        "x": 0,
                        "y": 1,
                        "width": 1,
                        "height": 3,
                        "config": {
                            location: "Montpellier",
                            metrics: "metric"
                        }
                    },
                    "default/greetings/3": {
                        "x": 1,
                        "y": 1,
                        "width": 1,
                        "height": 3,
                        "config": {}
                    },
                    "default/time/4": {
                        "x": 2,
                        "y": 1,
                        "width": 1,
                        "height": 3,
                        "config": {}
                    },
                    "default/time/5": {
                        "x": 3,
                        "y": 1,
                        "width": 1,
                        "height": 3,
                        "config": {}
                    },
                    "default/time/6": {
                        "x": 0,
                        "y": 4,
                        "width": 1,
                        "height": 3,
                        "config": {}
                    },
                    "default/time/7": {
                        "x": 1,
                        "y": 4,
                        "width": 1,
                        "height": 3,
                        "config": {}
                    },
                    "default/time/8": {
                        "x": 2,
                        "y": 4,
                        "width": 1,
                        "height": 3,
                        "config": {}
                    },
                    "default/time/9": {
                        "x": 3,
                        "y": 4,
                        "width": 1,
                        "height": 3,
                        "config": {}
                    },
                    "default/time/10": {
                        "x": 0,
                        "y": 7,
                        "width": 4,
                        "height": 1,
                        "config": {}
                    }
                }
            },
            width: 0,
            height: 0
        }
        this.dashboard = React.createRef()
        this.renderGrid = this.renderGrid.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    renderGrid() {
        let toRender = []
        for (const key in this.state.config.modules) {
            let module = this.state.config.modules[key]
            toRender.push(
                <div style={{
                    position: 'absolute',
                    width: this.state.width / this.state.config["max-width"] * module.width,
                    height: this.state.height / this.state.config["max-height"] * module.height,
                    left: this.state.width / this.state.config["max-width"] * module.x,
                    top: this.state.height / this.state.config["max-height"] * module.y
                }}>
                    {ModuleHandler.getElement(key, module.config)}
                </div>
            )
        }
        return toRender
    }

    render() {
        return (
            <div ref={this.dashboard}>
                {this.renderGrid()}
            </div>
        );
    }
}

export default Dashboard;
