export default class Service {

    baseUrl = 'https://api.themoviedb.org/3/'
    apiKey = '?api_key=55cbb1323dda6de71f3536cb119afb0e'

    getResource = async (path, queries = '') => {
        const res = await fetch(this.baseUrl + path + this.apiKey + queries, {
            method: "GET",
            headers: {
                accept: 'application/json',
            }
        })
        return res.json()
    }

    createRequestToken = async () => {
        return await this.getResource('authentication/token/new')
    }

    createGuestSession = async () => {
        return await this.getResource('authentication/guest_session/new')
    }

    getSearchedFilms = async (page) => {
        return await this.getResource('discover/movie', `&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`)
    }

    // getSearchPaginationLength = async () => {
    //     return await this.getResource('discover/movie', `&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`)
    // }

    getGenres = async () => {
        return await this.getResource('genre/movie/list')
    }

    getFilmsByKeywords = async (keyword, page) => {
        return await this.getResource('search/movie', `&query=${keyword}&page=${page}`)
    }

    getFilmsByKeywordsPaginationLength = async (keyword) => {
        return await this.getResource('search/movie', `&query=${keyword}`)
    }

    getPoster = async (id) => {
        return await this.getResource(`movie/${id}`)
    }

    getRatedFilms = async (guestSessionId, page) => {
        if (!guestSessionId) return
        return await this.getResource(`guest_session/${guestSessionId}/rated/movies`, `&language=en-US&page=${page}&sort_by=created_at.asc`)
    }

    getRatedPaginationLength = async (guestSessionId) => {
        return await this.getResource(`account/${guestSessionId}/rated/movies`, `&language=en-US&sort_by=created_at.asc`)
    }

    addRating = async (guestSessionId, movieId, value) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating${this.apiKey}&guest_session_id=${guestSessionId}`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: `{"value":"${value}"}`
        })
        return await res.json()
    }

}