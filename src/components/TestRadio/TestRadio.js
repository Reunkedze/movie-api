import React, { Component } from "react";

export default class TestRadio extends Component {
    render() {
        return (
            <div>
                <label>
                    <input type="radio" name="color" onClick={() => this.props.setColor('red')} />
                    Red
                </label>
                <label>
                    <input type="radio" name="color" onClick={() => this.props.setColor('blue')} />
                    Blue
                </label>
                <label>
                    <input type="radio" name="color" onClick={() => this.props.setColor('green')} />
                    Green
                </label>
            </div>
        )
    }
}
