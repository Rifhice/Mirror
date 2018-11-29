import React, { Component } from 'react';
import Capturer from './Capture'
import Faces from './Faces'
const sock = require('socket.io-client')('http://localhost:8081');

class Recognizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            faces: [],
            firstname: "",
            lastname: "",
            error: ""
        }
        sock.on("connect", () => {
            console.log("Connected !")
        })
        sock.on("faces", (faces) => {
            console.log(faces)
            this.setState({ faces: faces })
        })
        sock.on("status", (status) => {
            console.log(status)
            this.setState({ status })
        })
        sock.on("err", (error) => {
            console.log(error)
            this.setState({ error })
        })
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.exit = this.exit.bind(this)
        this.newPicture = this.newPicture.bind(this)
        this.picture = this.picture.bind(this)
        this.error = this.error.bind(this)
    }
    start() {
        this.setState({ isStarted: true, isTakingPicture: false })
        sock.emit("message", "start")
    }
    stop() {
        this.setState({ isStarted: false, faces: [] })
        sock.emit("message", "stop")
    }
    exit() {
        this.setState({ isStarted: true })
        sock.emit("message", "exit")
    }
    picture(name) {
        sock.emit("picture", name)
    }
    newPicture(image) {
        sock.emit("image", image)
    }

    error() {
        if (this.state.error) {
            setTimeout(() => this.setState({ error: "" }), 4000)
            return `Error : ${this.state.error}`
        }
        else {
            return ""
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.status}</p>
                <h1>{
                    this.error()
                }</h1>
                <div>
                    <Faces faces={this.state.faces}></Faces>
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.exit}>Exit</button>
                </div>
                <div>
                    <label>
                        Firstname:
                     <input type="text" name="name" onChange={event => this.setState({ firstname: event.target.value })} />
                    </label>
                    <label>
                        Lastname:
                     <input type="text" name="name" onChange={event => this.setState({ lastname: event.target.value })} />
                    </label>
                </div>
                <input type="submit" value="Add picture" onClick={() => this.state.firstname.trim() !== "" && this.state.lastname.trim() !== ""
                    ? this.picture([this.state.firstname, this.state.lastname])
                    : ""
                } />
            </div>
        );
    }
}

export default Recognizer;
