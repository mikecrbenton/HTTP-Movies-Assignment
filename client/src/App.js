import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie';
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {

  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  /* ===========GET MOVIE LIST==================
  - called on initial load by useEffect()
  - passed as props to 'add' and 'update' to 
    to repopulate the list after modifying API
    =============================================*/
  const getMovieList = () => {
    axios.get("http://localhost:5000/api/movies")
      .then(res => {
         console.log("INITIAL DATA : ", res.data );
         setMovieList(res.data)})
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  // INITIAL CALL OF API ^FUNCTION ABOVE^
  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route exact path="/movies/:id">
        <Movie 
            addToSavedList={addToSavedList} 
            getMovieList={ getMovieList }
         />
      </Route>

      <Route exact path="/update-movie/:id">
           <UpdateMovie getMovieList = { getMovieList } />
       </Route>

       <Route exact path="/add-movie">
          <AddMovie getMovieList={getMovieList}/>
       </Route>
    </div>
  );
};

export default App;
