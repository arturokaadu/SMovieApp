import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import swal from "@sweetalert/with-react";
import Pagination from "./Pagination";
import axios from "axios";

export const Listado = ({ addOrRemoveFromFavorites, movieDat }) => {
  const navigate = useNavigate();
  let getToken = sessionStorage.getItem("token");
/* 
  const [moviesList, setmoviesList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=2bda57bf0144e50a24fef4fbd75dcde8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
    axios
      .get(endPoint)
      
      .then((response) => {
        const apiData = response.data;
        setmoviesList(apiData.results);
      })
      .catch((error) => {
        swal(<h5> Error, try again later</h5>);
      });
  }, [setmoviesList]);
   */
  
  return (
    <>
      {!getToken && <Navigate to="/" />}

      <div className="row">
        {movieDat.map((e, index) => {
          const movieData = {
            imgURL: `https://image.tmdb.org/t/p/w500/${e.poster_path}`,
            overview: e.overview,
            title: e.title,
            id: e.id,
          };

          return (
            <div className="col-3" key={index}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
                <button
                  className="favourite-btn"
                  data-movie-id={e.id}
                  onClick={addOrRemoveFromFavorites(movieData)}
                >
                  🖤
                </button>
                <div className="card-body">
                  <h5 className="card-title">{e.title}</h5>
                  <p className="card-text">{e.overview}</p>
                  <Link
                    className="btn btn-primary"
                    to={`/detalle?MovieID=${e.id}`}
                  >
                    Detail{" "}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
       
      </div>
    </>
  );
};
