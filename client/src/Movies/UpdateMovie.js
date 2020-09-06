import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import '../index.css'

function UpdateMovie( props ){

   const [ movie, setMovie ] = useState({
      //id: null,
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
            props.getMovieList(res.data);
            push('/'); })
         .catch( (err) => { console.log(err) } );
   }


   return (
     <section className="update-form">
      <form className="form-styling" onSubmit={handleSubmit}>
         <label htmlFor="title">
            <div>Title</div>
            <input
               name="title"
               type="text"
               value={movie.title}
               onChange={handleChanges}
            />
         </label>
         <label htmlFor="director">
            <div>Director</div>
            <input
               name="director"
               type="text"
               value={movie.director}
               onChange={handleChanges}
            />
         </label>
         <label htmlFor="metascore">
            <div>Metascore</div>
            <input
               name="metascore"
               type="text"
               value={movie.metascore}
               onChange={handleChanges}
            />
         </label>
         <label htmlFor="stars">
            <div>Stars</div>
            <input
               name="stars"
               type="text"
               value={movie.stars}
               onChange={handleChanges}
            />
         </label>
         <button className="general-button" >Update Movie</button>
      </form>
    </section>
   )


}

export default UpdateMovie;