import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination'

function Movies({handleAddToWatchList, handleRemoveFromWatchList, watchlist}) {

  const [movies, setMovies] = useState([]) 
  const [pageNo, setPageNo] = useState(1) 

  const handlePrev = () => {

    if(pageNo==1){
      setPageNo(pageNo)
    }
    else{
      setPageNo(pageNo-1)
    }
   
  }

  const handleNext = () => {
    setPageNo(pageNo+1)
  }

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=def700300b2ea69d7c3d56bb95f24277&language=en-US&page=${pageNo}`).then(function(res){
      setMovies(res.data.results)
    })
  }, [pageNo])

  return (
    <div>
      <div className='text-2xl m-5 font-bold text-center'>
        Trending Movies
      </div>
      
      <div className='flex flex-row flex-wrap gap-4 justify-around items-end'>

        {movies.map((movieObj) => {
          return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddToWatchList={handleAddToWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} watchlist={watchlist}/>
        })}
      </div>

      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev}/>


    </div>
  )
}

export default Movies

// https://api.themoviedb.org/3/movie/popular?api_key=def700300b2ea69d7c3d56bb95f24277&language=en-US&page=1