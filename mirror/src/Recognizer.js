import React, { Component } from 'react';
import { Button, Label, Input } from 'semantic-ui-react'
import Capturer from './Capture'
import Faces from './Faces'
import uuidv1 from 'uuid/v1';
const sock = require('socket.io-client')('http://localhost:8081');

class Recognizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            faces: [],
            firstname: "",
            lastname: "",
            error: "",
            serverOnline: ""
        }
        sock.on("connect", () => {
            this.setState({ serverOnline: true })
        })
        sock.on("faces", (faces) => {
            this.setState({ faces: faces })
        })
        sock.on("status", (status) => {
            this.setState({ status: JSON.parse(status) })
        })
        sock.on("err", (error) => {
            this.setState({ error })
        })
        sock.on("connect_error", () => {
            this.setState({ serverOnline: false })
        })
        this.exit = this.exit.bind(this)
        this.restart = this.restart.bind(this)
        this.picture = this.picture.bind(this)
        this.newPicture = this.newPicture.bind(this)
        this.error = this.error.bind(this)
    }
    exit() {
        this.setState({ isStarted: true, faces: [] })
        sock.emit("message", "exit")
    }
    picture(data) {
        sock.emit("picture", data)
    }
    newPicture(data) {
        sock.emit("newPicture", JSON.stringify(data))
    }
    restart() {
        sock.emit("message", "restart")
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
                {this.state.serverOnline
                    ? <div>
                        <h1>{this.error()}</h1>
                        <h1>{this.state.status.status}</h1>
                        <div>
                            <Faces faces={this.state.faces.map(face => face.name)}></Faces>
                            {this.state.status.isStarted
                                ? <Button onClick={this.exit}>Stop</Button>
                                : <Button onClick={this.restart}>Restart</Button>
                            }
                        </div>
                        <div>
                            <Label>
                                Firstname:
                     <Input type="text" name="name" onChange={event => this.setState({ firstname: event.target.value })} />
                            </Label>
                            <Label>
                                Lastname:
                     <Input type="text" name="name" onChange={event => this.setState({ lastname: event.target.value })} />
                            </Label>
                        </div>
                        <Button onClick={() => this.state.firstname.trim() !== "" && this.state.lastname.trim() !== ""
                            ? this.picture([this.state.firstname, this.state.lastname, uuidv1()])
                            : ""
                        }>Add picture</Button>
                        <Button onClick={() => this.state.firstname.trim() !== "" && this.state.lastname.trim() !== ""
                            ? this.newPicture({
                                filename: `${this.state.firstname} ${this.state.lastname} ${uuidv1()}`,
                                image: ""
                            })
                            : ""
                        }>Create picture</Button>
                    </div>
                    : <p>The facial recognition module is offline</p>
                }
            </div>
        );
    }
}

export default Recognizer;
