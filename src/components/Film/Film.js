import React, { Component } from "react";
import Poster from "../Poster";
import "./Film.css"
import Rate from "../Rate";
import Service from "../../services/service";

export default class Film extends Component {

    service = new Service()

    onRate = async (rate) => {
        await this.service.addRating(this.props.guestSessionId, this.props.film.id, rate)
    }

    render() {
        const { film, loading, genresIds, filmGenresIds } = this.props

        let rateColor = '#000'
        if (film.vote_average >= 0 && film.vote_average < 3) {
            rateColor = '#E90000'
        } else if (film.vote_average >= 3 && film.vote_average < 5) {
            rateColor = '#E97E00'
        } else if (film.vote_average >= 5 && film.vote_average < 7) {
            rateColor = '#E9D100'
        } else {
            rateColor = '#66E900'
        }

        return (
            <li className="list_item" key={film["id"]}>
                <div className="desktop_card">
                    <Poster poster={film.poster} loading={loading} />
                    <span className="rating" style={{ border: '3px solid' + rateColor }}>{film["vote_average"]}</span>
                    <div className="list_text">
                        {film["title"]}
                        <br />
                        {film["date"]}
                        <div>
                            {genresIds.filter(genre => filmGenresIds.indexOf(genre.id) !== -1).map(genreObj => <button key={genreObj.id} className="genre">{genreObj.name}</button>)}
                        </div>
                        <p>{film.overview}</p>
                        <Rate onRate={this.onRate} id={film.id} />
                    </div>
                </div>
                <div className="mobile_card">
                    <div className="mobile_header">
                        <div className="mobile_header-container">
                            <Poster poster={film.poster} loading={loading} />
                            <div className="mobile_text">
                                <span className="rating" style={{ border: '3px solid' + rateColor }}>{film["vote_average"]}</span>
                                {film["title"]}
                                <br />
                                {film["date"]}
                                <div>
                                    {genresIds.filter(genre => filmGenresIds.indexOf(genre.id) !== -1).map(genreObj => <button key={genreObj.id} className="genre">{genreObj.name}</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>{film.overview}</p>
                    <Rate onRate={this.onRate} id={film.id} />
                </div>
            </li>
        )
    }
}