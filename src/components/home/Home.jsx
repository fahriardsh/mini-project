import React, { useEffect, useState } from 'react';
import {fetchGenre, fetchMovies, fetchMovieByGenre} from "../../service";
import RBCarousel from 'react-bootstrap-carousel';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

export function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre(28));
    };
    fetchAPI();
    }, []);

    const movies = nowPlaying.slice(0, 6).map((item, index) => {
        return(
            // 
            <div style={{height: 500, width: "100%"}}  key={index}>
                <div className="carousel-center">
                    <img style={{height: 600}} src={item.backPoster} alt={item.title}/>
                </div>
                <div className="catousel-center">
                    <i className="far fa-play-circle"
                    style={{fontSize: 95, color: "f4c10f"}}></i>
                </div>
                <div className="carousel-caption" style={{textAlign: 'center', fontSize: 35}}>
                    {item.title}
                </div>
            </div>
        )
    });

    const genreList = genres.map((item, index) => {
        return(
            <li className="list-inline-item" key={index}>
                <button type="button" className ="btn btn-outline-info">
                    {item.name}
                </button>
            </li>
        )
    })

    const movieList = movieByGenre.slice(0, 12).map((item, index) => {
        return(
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}></img>
                    </Link>
                </div>
                <div className="mt-1">
                    <h6 style={{fontWeight: 'bolder'}}>{item.title}</h6>
                    <h6> Rated: {item.rating}</h6>
                    <ReactStars count={item.rating} size={20} color={'#f4c10f'}></ReactStars>
                </div>
                <br></br>
            </div>
        )   
    })

    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slideshowSpeed={5000}
                        version={4}
                        indicators={false} >
                            {movies}
                    </RBCarousel>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: "#5a606b"}}>
                        TRENDING NOW
                    </p>
                </div>
            </div>
            
            <div className="row mt-3">
                {movieList} 
            </div>

            <div className="mt-5" style={{borderTop: "1px solid #51606b"}}></div>    

            <div className="row mt-3">
                <div style={{color: '#5a606b'}}>
                    <p>Copyright &copy;2020 Streamflix</p>
                </div>
            </div>
        </div>
    );
}

