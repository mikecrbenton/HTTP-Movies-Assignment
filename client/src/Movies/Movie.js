import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useHistory,useRouteMatch } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie( props ) {

  const [movie, setMovie] = useState(null);

  //const params = useParams();
  const { id } = useParams();
  const history = useHistory();
  const match = useRouteMatch();

  const getMovie = (id) => {

    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const deleteItem = (e) => {

     axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then( (res) => {
         console.log("DELETED IS: ", res);
         props.getMovieList(res.data)
         history.push("/");
      })
  }

  useEffect(() => {
    getMovie(id); // LOCAL FUNCTION
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">

      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button className="general-button" onClick={ () => {
         history.push(`/update-movie/${match.params.id}`);
      }}>Update</button>

      <button className="general-button" onClick={deleteItem}>Delete</button>

    </div>
  );
}

export default Movie;
