import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = (props) => {

    const history = useHistory();

    const params = useParams();

    const initialMovie = {
        id: params.id,
        title: '',
        director: '',
        metascore: '',
        stars: [,,,]
    }

    const initialStars = {
        star1: '',
        star2: '',
        star3: '',
    }

    const [movie, setMovie] = useState(initialMovie)
    const [stars, setStars] = useState(initialStars)

    const handleChange = e => {
        setMovie({
          ...movie,
          [e.target.name]: e.target.value,
        });
    };

    const handleStars = e => {
        setStars({
            ...stars,
            [e.target.name]: e.target.value,
        })
    }

    const putRequest = () => {
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then(res => {
            console.log(res);
            history.push("/");
        })
        .catch(err => {
            console.log(err)
        })
    }

    const mergeStars = (e) => {
        e.preventDefault();
        var joined = [stars.star1, stars.star2, stars.star3]
        setMovie({
            ...movie,
            stars: joined
        })
    }

    useEffect(() => {
        putRequest();
    }, movie.stars)

    return (
        <div className="form-container">
            <form onSubmit={mergeStars}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                />
                <label>Director</label>
                <input
                    type="text"
                    name="director"
                    value={movie.director}
                    onChange={handleChange}
                />
                <label>Metascore</label>
                <input
                    type="text"
                    name="metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                />
                <label>Stars</label>
                <input
                    type="text"
                    name="star1"
                    value={stars.star1}
                    onChange={handleStars}
                />
                <input
                    type="text"
                    name="star2"
                    value={stars.star2}
                    onChange={handleStars}
                />
                <input
                    type="text"
                    name="star3"
                    value={stars.star3}
                    onChange={handleStars}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default UpdateMovie;
