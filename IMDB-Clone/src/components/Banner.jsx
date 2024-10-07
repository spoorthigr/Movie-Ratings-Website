import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [fade, setFade] = useState(true); 


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=def700300b2ea69d7c3d56bb95f24277&language=en-US&page=1`
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error('Error fetching banner movies:', err);
      }
    };

    fetchMovies();
  }, []);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length); 
        setFade(true); 
      }, 500); 
    }, 5000);
    return () => clearInterval(interval); 
  }, [movies]);


  if (movies.length === 0) {
    return <div>Loading banner...</div>;
  }

  const currentMovie = movies[currentIndex];

  return (
    <div
      className={`h-[20vh] md:h-[70vh] bg-cover bg-center flex items-end transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})`,
      }}
    >
      <div className='text-2xl w-full text-center text-white bg-gray-900/60 p-4'>
        {currentMovie.title}
      </div>
    </div>
  );
}

export default Banner;
