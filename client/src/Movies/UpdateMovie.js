import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';

function UpdateMovie( props ){

   const [ movie, setMovie ] = useState({
      id: null,
      title: "",
      director: "",
      metascore: "",
      stars: []
   })

   const match = useRouteMatch();
   const { push } = useHistory();
   const { id } = useParams();

   // USE EFFECT==============================================
   // -- SET THE FORM WITH .GET FROM API
   useEffect( () => {
      //const id = match.params.id;

      axios.get(`http://localhost:5000/api/movies/${id}`)
         .then( (res) => {   
           setMovie(res.data)
         })
         .catch( (err) => console.log(err));
      },[id])

   // CHANGE HANDLER==========================================
   const handleChanges = (e) => {
      e.persist();

      //IF COMMA SEPARATED STRING - CONVERT TO AN ARRAY
      let value = e.target.value;
      if(e.target.name === 'stars'){ 
         value = value.split(","); 
      }

      console.log("VALUE IS: ", value);

      setMovie({
         ...movie,
         [e.target.name]: value
      });
   }

   // UPDATE / PUT FUNCTION===================================
   const handleSubmit = (e) => {
      e.preventDefault();

      //const starsArray = movie.stars.split(',');
      
      //setState( ...movie, movie.stars :  starsArray );

      //const id = match.params.id;

      axios.put(`http://localhost:5000/api/movies/${id}`, movie)
         .then( (res) => {
            props.getMovies(res.data);
            push('/'); })
         .catch( (err) => { console.log(err) } );
   }


   return (
     <section className="update-form">
      <form onSubmit={handleSubmit}>
         <label htmlFor="title">
            TITLE
            <input
               name="title"
               type="text"
               value={movie.title}
               onChange={handleChanges}
            />
         </label>
         <label htmlFor="director">
            DIRECTOR
            <input
               name="director"
               type="text"
               value={movie.director}
               onChange={handleChanges}
            />
         </label>
         <label htmlFor="metascore">
            METASCORE
            <input
               name="metascore"
               type="text"
               value={movie.metascore}
               onChange={handleChanges}
            />
         </label>
         <label htmlFor="stars">
            STARS
            <input
               name="stars"
               type="text"
               value={movie.stars}
               onChange={handleChanges}
            />
         </label>
         <button>Update Movie</button>
      </form>
    </section>
   )


}

export default UpdateMovie;