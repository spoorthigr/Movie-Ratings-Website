import React, { useEffect, useState } from "react";
import genreIds from "../Utility/genres";

function WatchList({ watchlist, setWatchList, handleRemoveFromWatchList}) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState("All Genres");

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });

    setWatchList([...sortedIncreasing]);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });

    setWatchList([...sortedDecreasing]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreIds[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
    console.log(temp);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap mx-4">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={
                currGenre === genre
                  ? "flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center bg-blue-400 mx-4 cursor-pointer"
                  : "flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center bg-gray-400/60 cursor-pointer mx-4"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4 rounded-xl"
        />
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200 m-8">
        <table className="w-full text-gray-600 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>

              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2 cursor-pointer">
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2 cursor-pointer">
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
              </th>

              <th>Popularity</th>
              <th>Genres</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((movieObj) => {
              if(currGenre === 'All Genres'){
                return true
              }
              else{
                return genreIds[movieObj.genre_ids[0]] === currGenre
              }

            }).filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        className="h-[6rem] w-[10rem]"
                      />
                      <div className="mx-20">{movieObj.title}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>

                    <td>{movieObj.popularity}</td>

                    <td>{genreIds[movieObj.genre_ids[0]]}</td>

                    <td onClick={() => handleRemoveFromWatchList(movieObj)} className="text-red-800 cursor-pointer">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
