import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";
import { HeartSwitch } from "@anatoliygatt/heart-switch";

export const Resultados = ({addOrRemoveFromFavorites, favs,showContent, handleToggleContent}) => {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");
  //let navigate = useNavigate();

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=2bda57bf0144e50a24fef4fbd75dcde8&page=1&query=${keyword}`;
    axios
      .get(endpoint)
      .then((response) => {
        const moviesArray = response.data.results;
        //console.log(moviesArray);
        //navigate('/resultados')
        if (moviesArray.length === 0) {
          swal(<h4>No results</h4>);
        }
        setMoviesResults(moviesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword]);

  // let endpoint = https://api.themoviedb.org/3/search/company?api_key=2bda57bf0144e50a24fef4fbd75dcde8&page=1&query=
  return (
    <>
      <h2>results for: {keyword}</h2>
      {moviesResults.length}
      <div className="row">
      {moviesResults.map((e, index) => {
          const movieData = {
            imgURL: `https://image.tmdb.org/t/p/w500/${e.poster_path}`,
            overview: e.overview,
            title: e.title,
            id: e.id,
          };

          return (
            <div className="col-3" key={index}>
              <div className="card text-white bg-dark my-4">
                <img
                  src={`${movieData.imgURL}`}
                  className="cardImg"
                  alt="..."
                />
               <div className="d-flex justify-content-between mr-2">
                <HeartSwitch
                  className="favourite-btn"
                  data-movie-id={e.id}
                  onClick={addOrRemoveFromFavorites(movieData)}
                  checked={favs.find((fav) => fav.id === e.id) ? true : false}
                />
                <span className="vote-average d-flex align-items-center justify-content-center">{e.vote_average}</span>
                </div>
                <div className="card-body ">
                  <span className="card-title text-center d-flex justify-content-center">
                    {e.title}
                  </span>

                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-info bg-dark  text-white"
                      onClick={() => handleToggleContent(index)}
                    >
                      {showContent[index] ? "ocultar" : "Mostrar Sinopsis"}

                      <div>
                        {showContent[index] && <span>{e.overview}</span>}
                      </div>
                    </button>
                  </div>
                  <div className="d-flex mt-2 justify-content-center">
                    <Link
                      className="btn btn-info btn btn-info bg-dark  text-white mt-2 d-flex justify-content-center"
                      to={`/detalle?MovieID=${e.id}`}
                    >
                      Detail{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
