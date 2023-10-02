import React, { Component } from "react";
import { Rate } from 'antd';
import "./Rate.css"
import { Consumer } from "../Context";

export default class RateComponent extends Component {
    render() {
        return (
            <Consumer>
                {
                    (rating) => {
                        return (
                            <Rate allowHalf count={10} defaultValue={rating} onChange={(value) => this.props.onRate(value)} destroyInactiveTabPane />
                        )
                    }
                }
            </Consumer>
        )
    }
}