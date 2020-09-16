import axios from 'axios';

const apiKey = 'e14b198b80c536e09e57b52ce2bb66b6';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;


export const fetchMovies = async () => {
    try {
        const {data} = await axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch(errror) {
        
    }
}
export const fetchGenre = async() => {
    try {
        const {data} = await axios.get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        })
        const modifiedData = data['genres'].map((g) => ({
            id: g['id'],
            name: g['name']
        }))
        return modifiedData;
    } catch (error) {
        
    }
}
export const fetchMovieByGenre = async (genre_id) => {
    try {
        const {data} = await axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1,
                with_genres: genre_id
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch (error) {
        
    }
}

export const fetchMovieDetail = async(id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en-US',
            }
        })
        return data
    } catch (error) {
        
    }
}

export const fetchSimilarMovie = async(id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en-US',
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        
        return modifiedData;
    } catch (error) {
        
    }
}