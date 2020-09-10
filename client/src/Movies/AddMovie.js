import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddMovie( props ) {

   const { push } = useHistory();

   const [movie, setMovie] = useState({
      id: "",
      title: "",
      director: "",
      metascore: "",
      stars: []
    });

   // CHANGE HANDLER==========================================
   const handleChanges = (e) => {

      console.log("HANDLE CHANGE : ", e);

       e.persist();
       //IF COMMA SEPARATED STRING - CONVERT TO AN ARRAY
       let value = e.target.value;
       if(e.target.name === 'stars'){ 
          value = value.split(","); 
       }
 
       //console.log("VALUE IS: ", value);

      setMovie({
         ...movie,
         [e.target.name]: e.target.value
      });
   }

   // ADD / POST FUNCTION===================================
   const handleSubmit = (e) => {
      e.preventDefault();
   
      let formattedMovie = {
         ...movie,
         stars: movie.stars.split(',')
      }

      axios.post(`http://localhost:5000/api/movies/`, formattedMovie)
         .then( (res) => {
            //console.log("RESULT IN ADD : ", res)
            props.getMovieList(res.data);
            push('/'); })
         .catch( (err) => { console.log(err) } );
   }

   return (
    
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

          <button className="general-button">Add Movie</button>

       </form>
    )


}

export default AddMovie;