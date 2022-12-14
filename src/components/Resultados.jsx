import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Resultados = () => {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");
  let navigate = useNavigate();

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=2bda57bf0144e50a24fef4fbd75dcde8&page=1&query=${keyword}`;
    axios
      .get(endpoint)
      .then((response) => {
        const moviesArray = response.data.results;
        console.log(moviesArray);
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
      {moviesResults.length && <h4>No results</h4>}
      <div className="row">
        {moviesResults.map((e, index) => {
          return (
            <div className="col-4" key={index}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
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
