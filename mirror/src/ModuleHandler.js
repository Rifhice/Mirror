import React, { Component } from 'react';
import Recognizer from './containers/Recognizer.container'
import Weather from './containers/Weather.container'
import Time from './containers/Time.container'


const dictionnary = {
    "greetings": (config) => <Recognizer config={config}></Recognizer>,
    "time": (config) => <Time></Time>,
    "weather": (config) => <Weather config={config}></Weather>
}

export default {
    getElement: (name, config) => {
        const name_splitted = name.split('/')
        if (name_splitted[0] === "default") {
            return dictionnary[name_splitted[1]]
                ? dictionnary[name_splitted[1]](config)
                : <div></div>
        }
        else {
            console.log("Custom module TODO")
        }
    }
}