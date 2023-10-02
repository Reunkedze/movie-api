import React, { Component } from "react";
import "./FilmsList.css"
import Service from "../../services/service";
import Spinner from "../Spinner"
import Error from "../Error";
import { Alert } from "antd";
import { Online, Offline } from "react-detect-offline"
import Film from "../Film/Film";
import { Provider } from "../Context";

export default class FilmsList extends Component {

    service = new Service()

    charactersCounter = (str) => {
        if (str.length <= 220) {
            return str
        } else {
            return this.charactersCounter(str.split(' ').slice(0, str.split(' ').length - 1).join(' '))
        }
    }

    createFilmsList = (d) => {
        const newFilmsList = []
        if (!d) return
        d.results.forEach((film) => {
            newFilmsList.push({
                "id": film.id,
                "title": film.title,
                "date": film.release_date,
                "vote_average": film.vote_average,
                "overview": this.charactersCounter(film.overview),
                "poster": 'https://image.tmdb.org/t/p/original' + film.poster_path,
                'genresIds': film.genre_ids
            })
        })
        return newFilmsList
    }

    updateFilms = (prom) => {
        prom().then((d) => {
            this.setState({
                filmsList: this.createFilmsList(d),
                loading: false
            })
        }).catch((e) => {
            console.log(e)
            this.setState({
                error: true,
                loading: false
            })
        })
    }

    updateSearchedFilms() {
        this.updateFilms(() => this.service.getSearchedFilms(this.props.page))
    }

    updateRatedFilms() {
        this.updateFilms(async () => await this.service.getRatedFilms(this.state.guestSessionId, this.props.page))
    }

    updateFilmsByKeyword() {
        this.updateFilms(() => this.service.getFilmsByKeywords(this.props.keyword, this.props.page))

    }

    state = {
        loading: true,
        error: false,
        filmsList: null,
        ratedFilmsList: null,
        genresIds: null,
        requestToken: null,
        guestSessionId: null,
    }

    async componentDidMount() {
        if (localStorage.guestSessionId === undefined) {
            await this.service.createGuestSession().then(d => {
                this.setState({ guestSessionId: d.guest_session_id })
                localStorage.guestSessionId = d.guest_session_id
            })
        } else {
            this.setState({ guestSessionId: localStorage.guestSessionId })
        }
        await this.service.getGenres().then(d => this.setState({ genresIds: d.genres }))
        await this.service.getRatedFilms(this.state.guestSessionId, this.props.page).then(d => this.setState({ ratedFilmsList: d }))
        await this.updateSearchedFilms()
        if (this.props.context === 'search') {
            await this.updateSearchedFilms()
            // this.service.getSearchPaginationLength().then(d => this.props.setFilmsListLength(d.results.length))
        } else {
            await this.updateRatedFilms()
            // this.service.getRatedPaginationLength().then(d => this.props.setFilmsListLength(d.results.length))
        }
    }

    async componentDidUpdate(p) {
        if (p !== this.props) {
            if (p.context !== this.props.context) {
                this.props.setPage(1)
                if (this.props.context === 'search') {
                    await this.props.setPaginationLength(50)
                    await this.updateSearchedFilms()
                } else if (this.props.context === 'rated') {
                    await this.service.getRatedFilms(this.state.guestSessionId, Number(this.props.page)).then(async d => {
                        console.log(d)
                        await this.props.setPaginationLength(d.total_pages)
                    })
                    await this.updateRatedFilms()
                }
            } else if (p.keyword !== this.props.keyword) {
                if (this.props.keyword !== '') {
                    await this.service.getFilmsByKeywords(this.props.keyword, this.props.page).then(d => this.props.setPaginationLength(d.total_pages))
                    await this.updateFilmsByKeyword()
                } else {
                    await this.props.setPaginationLength(50)
                    await this.updateSearchedFilms()
                    console.log('salam')
                }
            } else if (p.page !== this.props.page) {
                if (this.props.keyword !== '') {
                    this.updateFilmsByKeyword()
                } else {
                    this.updateSearchedFilms()
                }
            }

            // if (p !== this.props) {

            //     if (this.props.context === 'search') {
            //         if (p.keyword !== this.props.keyword) {
            //             // await this.service.getFilmsByKeywordsPaginationLength(this.props.keyword).then((d => this.props.setPaginationLength(d.total_pages)))
            //         } else if (p.page !== this.props.page) {
            //             if (this.props.keyword !== '') {
            //                 await this.updateFilmsByKeyword()
            //             } else {
            //                 await this.updateSearchedFilms()
            //             }
            //         }
            //     } else if (this.props.context === 'rated') {

            //     }
            // }
        }
    }

    render() {
        const { loading, error, filmsList, ratedFilmsList, genresIds } = this.state

        if (loading) {
            return (
                <div className="spinner-wrapper">
                    <Spinner />
                </div>
            )
        } else if (error) {
            return (
                <div className="spinner-wrapper">
                    <Error />
                </div>
            )
        }
        return (
            < main className="container" >
                <Online>
                    <ul className="list" >
                        {(filmsList !== undefined) ? filmsList.map(film => {
                            let rating = null
                            if (ratedFilmsList !== null) {
                                const ratedFilmIndex = ratedFilmsList.results.findIndex((ratedFilm) => ratedFilm.id === film.id)
                                if (ratedFilmIndex !== -1) {
                                    rating = ratedFilmsList.results[ratedFilmIndex].rating
                                }
                            }
                            return (
                                <Provider key={film.id} value={rating}>
                                    <Film
                                        film={film}
                                        loading={loading}
                                        filmGenresIds={film.genresIds}
                                        genresIds={genresIds}
                                        guestSessionId={this.state.guestSessionId}
                                        page={this.props.page}
                                        requestToken={this.state.requestToken}
                                    />
                                </Provider>
                            )
                        }) : null}
                    </ul>
                </Online>
                <Offline>
                    <div className="spinner-wrapper">
                        <Alert message="Check your internet connection" type="warning" />
                    </div>
                </Offline>
            </main >
        )
    }
}
