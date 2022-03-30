import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container, Grid} from "@mui/material";
import {MovieItem} from "../components/MovieItem";
import {styled} from "@mui/material";
import {getStarsByRating} from "../utils/getStarsByRating";


const Box = styled('div')`
  width: 100%;
  height: 50vh;
  background-image: ${(props) => `url("https://image.tmdb.org/t/p/original${props.movie.backdrop_path}");`}
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%);
  }
  color: white;
`
const MovieDescrWrapper = styled('div')`
  width: 40%;
  height: 90%;
  display: flex;
  flex-direction: column;
  color: white;
  position: absolute;
  left: 10%;
`
const GenresWrapper = styled('div')`
  display: flex;
  flex-directon: row;
  margin-bottom: 17px;
`

const Genre = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  color: #0FEFFD;
  background: rgba(29, 29, 29, 0.7);
  border-radius: 0px 8px;
  text-transform: capitalize;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  margin-right: 15px;
  padding: 4px 8px;
`
const Stars = styled('div')`
  z-index: 1;
  font-size: 12px;
  margin-bottom: 16px;
`

const Title = styled('p')`
  color: white;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 50px;
  line-height: 64px;
  z-index: 1;
  margin-bottom: 16px;
  margin-top: 0;
`
const Description = styled('p')`
    height: 96px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: white;
    z-index: 0;
    margin-bottom: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
`

export function MoviePage() {
    const params = useParams()
    const [movieDescr, setData] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
    }, [params.id])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`)
            .then((res) => res.json())
            .then((data) => {
                setSimilarMovies(data.results);
            })
    }, [params.id])

    similarMovies.length = 5;

    return (
        <div style={{backgroundColor: "#1D1D1D"}}>
            <Container maxWidth="xl">
                <Box movie={movieDescr}>
                    <MovieDescrWrapper>
                        <GenresWrapper>
                            {movieDescr.genres && movieDescr.genres.map((item) => (
                                <Genre genre={item} key={item.id}>
                                    <span>{item.name}</span>
                                </Genre>
                            ))}
                        </GenresWrapper>
                        <Stars>
                            {getStarsByRating(movieDescr.vote_average)}
                        </Stars>
                        <Title>{movieDescr.title}</Title>
                        <Description>{movieDescr.overview}</Description>
                    </MovieDescrWrapper>
                </Box>
                <div style={{padding: "0px 80px"}}>
                    <h2 style={{color: "white"}}>Similar movies</h2>
                    <Grid container spacing={2} style={{padding: "30px 0px"}}>
                        {similarMovies.map((movie) => (
                            <Grid item xs={12 / 5}>
                                <MovieItem movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
                
            </Container>
        </div>
    )
}