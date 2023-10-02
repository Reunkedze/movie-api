import React, { Component } from "react";
import "./Search.css"
import { Input } from "antd";

export default class Search extends Component {
    render() {
        const debounce = (fn, debounceTime) => {
            let timeout;
            return function () {
                const fnCall = () => {
                    fn.apply(this, arguments);
                };
                clearTimeout(timeout);
                timeout = setTimeout(fnCall, debounceTime);
            };
        };

        return (
            <div className="search-wrapper">
                <Input className="search" placeholder="search" onChange={debounce((value) => {
                    this.props.setKeyword(value.target.value)
                }, 600)} />
            </div>
        )
    }
}
