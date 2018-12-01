import React, { Component } from 'react';
import { Button, Label, Input } from 'semantic-ui-react'
import Capturer from '../../Capture'
import Faces from './Faces'
import uuidv1 from 'uuid/v1';

class Recognizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
        }
    }

    render() {
        const { t, i18n } = this.props;
        return (
            <div>
                {this.props.FacialRecognition.isConnected
                    ? <div>
                        <h1>{this.props.FacialRecognition.status}</h1>
                        <div>
                            <Faces faces={this.props.FacialRecognition.faces.map(face => face.name)}></Faces>
                            {this.props.FacialRecognition.isStarted
                                ? <Button onClick={this.exit} size='tiny'>Stop</Button>
                                : <Button onClick={this.restart}>Restart</Button>
                            }
                        </div>
                        <div>
                            <Label size='tiny'>
                                Firstname:
                     <Input type="text" name="name" onChange={event => this.setState({ firstname: event.target.value })} />
                            </Label>
                            <Label size='tiny'>
                                Lastname:
                     <Input type="text" name="name" onChange={event => this.setState({ lastname: event.target.value })} />
                            </Label>
                        </div>
                        <Button size='tiny' onClick={() => this.state.firstname.trim() !== "" && this.state.lastname.trim() !== ""
                            ? this.picture([this.state.firstname, this.state.lastname, uuidv1()])
                            : ""
                        }>Add picture</Button>
                        <Button size='tiny' onClick={() => this.state.firstname.trim() !== "" && this.state.lastname.trim() !== ""
                            ? this.newPicture({
                                filename: `${this.state.firstname} ${this.state.lastname} ${uuidv1()}`,
                                image: ""
                            })
                            : ""
                        }>Create picture</Button>
                    </div>
                    : <p>{t('FACIAL_OFFLINE')}</p>
                }
            </div>
        );
    }
}

export default Recognizer;
