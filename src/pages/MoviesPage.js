import {useEffect, useState} from "react";
import {Button, Container, Grid, TextField} from "@mui/material";
import {MovieItem} from "../components/MovieItem";
import React from "react";

export function MoviesPage() {
    const [movies, setMovies] = useState([]);

    let textQ = React.createRef();

    let setQuery = () => {
        let query = textQ.current.value;
        alert(query);
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results)
            })
    }, [])

    return (
        <Container maxWidth="xl" sx={{padding: "30px"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1 style={{marginTop:"0", lineHeight: "100%"}}>Movies</h1>
                <div className="search-field" style={{width: "350px", display: "flex", justifyContent: "space-around", padding: "10px 0"}}>
                    <TextField label="Search" ref={textQ}></TextField>
                    <Button variant="contained" onClick={setQuery}>Search</Button>
                </div>
                
            </div>
            <Grid container spacing={2}>
                {movies.map((movie) => (
                    <Grid item xs={12 / 5}>
                        <MovieItem movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}