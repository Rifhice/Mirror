import React, { Component } from 'react';

export default class Faces extends Component {

    render() {
        return (
            <div>
                {this.props.faces && this.props.faces.length > 0
                    ? this.props.faces.map(face => <p>{face}</p>)
                    : <p>No one detected.</p>
                }
            </div>
        );
    }
}