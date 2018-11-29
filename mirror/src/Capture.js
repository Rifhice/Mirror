
import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { CLIENT_RENEG_LIMIT } from 'tls';

class App extends Component {

    render() {
        return (
            <div>
                <Camera
                    onTakePhoto={(dataUri) => { this.props.onTakePhoto(dataUri); }}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    idealResolution={{ width: 640, height: 480 }}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.97}
                    isMaxResolution={false}
                    isImageMirror={false}
                    isDisplayStartCameraError={true}
                    sizeFactor={1}
                />
            </div>
        );
    }
}

export default App;