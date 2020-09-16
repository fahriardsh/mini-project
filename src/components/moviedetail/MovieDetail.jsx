import React, { useEffect, useState } from 'react'
import {fetchMovieDetail, fetchSimilarMovie} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

export function MovieDetail({match}) {
    let params = match.params;
    const [detail, setDetail] = useState([])
    const [similarMovie, setSimilarMovie] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
            setSimilarMovie(await fetchSimilarMovie(params.id));
        };

        fetchAPI();
    }, [params.id]);

    
    const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
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
                <div className="col text-center" style={{width: '100%'}}>
                    <img className="img-fluid" src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt={detail.title}></img>
                </div>
            </div>
            <div className="mt-1">
                <h1 style={{fontWeight: 'bolder'}}>{detail.title}</h1>
                <p>{detail.overview}</p>
                <p>Release date : {detail.release_date}</p>
                <p>Rated        : {detail.vote_average}</p>
            </div>
            <div>
            {detail.vote_average > 0 && detail.vote_average < 3 &&
                <h5 style={{fontWeight: 'bolder'}}>
                   Price        : Rp 3.500
                </h5>
            }
            {detail.vote_average > 3 && detail.vote_average < 6 &&
                <h5 style={{fontWeight: 'bolder'}}>
                   Price        : Rp 8.250
                </h5>
            }
            {detail.vote_average > 6 && detail.vote_average < 8 &&
                <h5 style={{fontWeight: 'bolder'}}>
                   Price        : Rp 16.350
                </h5>
            }
            {detail.vote_average > 8 && detail.vote_average < 11 &&
                <h5 style={{fontWeight: 'bolder'}}>
                   Price        : Rp 21.250
                </h5>
            }
            </div>
            
            <button type="button" className ="btn btn-outline-info">
                    Buy Now
            </button>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: "#5a606b"}}>
                        SIMILAR MOVIE
                    </p>
                </div>
            </div>
            <div className="row mt-3">
                {similarMovieList} 
            </div>
        </div>
    )
}
