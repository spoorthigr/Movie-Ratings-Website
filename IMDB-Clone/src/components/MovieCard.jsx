import React from 'react';

function MovieCard({movieObj, poster_path, name, handleAddToWatchList, handleRemoveFromWatchList, watchlist}) {

  function doesContain(movieObj){
    for(let i=0; i<watchlist.length; i++){
      if(watchlist[i].id === movieObj.id){
        return true
      }
    }
    return false
  }
  return (
    <div className='h-[40vh] w-[200px] bg-cover bg-center rounded-xl cursor-pointer hover:scale-110 duration-300 flex flex-col justify-between items-end' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`}}>

      {doesContain(movieObj) ? (

        <div onClick={()=>(handleRemoveFromWatchList(movieObj))} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-black'>&#10060;</div>

      ) : (

        <div onClick={()=>(handleAddToWatchList(movieObj))} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-black'>&#128525;</div>

      )}
     

      <div className='text-white text-xl w-full p-2 text-center bg-gray-900/60'>
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
