import React, { Component } from "react"
import "./App.css"
import FilmsList from "../FilmsList"
import Search from "../Search"
import Pagination from "../Pagination"
import TabsComponent from "../Tabs"
import { Provider } from "../Context"
import Service from "../../services/service"

export default class App extends Component {

    service = new Service()

    state = {
        page: 1,
        keyword: '',
        context: "search",
        filmsListLength: null,
        guestSessionId: null,
        paginationLength: 50
    }

    setPage = (num) => {
        this.setState({ page: num })
    }

    setKeyword = (keyword) => {
        this.setState({ keyword: keyword })
    }

    setContext = (tab) => {
        this.setState({
            context: tab
        })
    }

    setFilmsListLength = (length) => {
        this.setState({ filmsListLength: length })
    }

    setPaginationLength = (size) => {
        this.setState({ paginationLength: size })
    }

    render() {
        const { page, keyword, context } = this.state
        return (
            <Provider value={context}>
                <main>
                    <TabsComponent setContext={this.setContext} />
                    {context === 'search' ? <Search setKeyword={this.setKeyword} /> : null}
                    <FilmsList
                        context={context}
                        page={page}
                        keyword={keyword}
                        setPage={this.setPage}
                        setColor={this.setColor}
                        setFilmsListLength={this.setFilmsListLength}
                        guestSessionId={this.state.guestSessionId}
                        setPaginationLength={this.setPaginationLength}
                    />
                    <Pagination page={page} setPage={this.setPage} paginationLength={this.state.paginationLength} />
                </main>
            </Provider>
        )
    }
}
