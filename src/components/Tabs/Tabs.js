import "./Tabs.css"
import React, { Component } from "react"
import { Tabs } from 'antd';


export default class TabsComponent extends Component {

    onChange = (key) => {
        this.props.setContext(key)
    };

    items = [
        {
            key: 'search',
            label: 'Search',
        },
        {
            key: 'rated',
            label: 'Rated',
        },
    ];

    render() {
        return (
            <div className="tabs-wrapper">
                <Tabs defaultActiveKey="1" items={this.items} onChange={this.onChange} />
            </div>
        )
    }
}