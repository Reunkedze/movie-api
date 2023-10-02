import React, { Component } from "react"
import "./Pagination.css"
import { Pagination } from "antd"

export default class PaginationLine extends Component {
    render() {
        return (
            <div className="pagination">
                <Pagination current={this.props.page} total={this.props.paginationLength * 10} onChange={(num) => {
                    this.props.setPage(num)
                }} />
            </div>
        )
    }
}
