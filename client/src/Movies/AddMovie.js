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
      setMovie({
         ...movie,
         [e.target.name]: e.target.value
      });
   }

   // ADD / POST FUNCTION===================================
   const handleSubmit = (e) => {
      e.preventDefault();
      //movie.metascore = movie.metascore*1;
      //movie.stars = movie.stars.split(",");

      //const id = match.params.id;

      axios.post(`http://localhost:5000/api/movies/`, movie)
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

          <button>Add Movie</button>

       </form>
     </section>
    )


}

export default AddMovie;