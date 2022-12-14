import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export const Detalle = () => {
  let getToken = sessionStorage.getItem("token");

  //try this with useParams
  let query = new URLSearchParams(window.location.search);
  //back here if it sets on fire MovieID
  let movieID = query.get("MovieID");

  console.log(movieID);

  // investigate why null
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=2bda57bf0144e50a24fef4fbd75dcde8&language=en-US`;

    axios
      .get(endpoint)
      .then((response) => {
        const apiData = response.data;
        setDetails(apiData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  return (
    <>
      {!getToken && <Navigate to="/" />}
      {!details && <p>Loading...</p>}
      {details && (
        <>
          <h3>{details.title}</h3>
          <div className="row">
            <div className="col-4">
              <img
                src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                className="img-fluid"
                alt="poster"
              />
            </div>
            <div className="col-8">
              <h5>Release Date: {details.release_date}</h5>
              <h4>Reseña:</h4>
              <p>{details.overview}</p>
              <h4>Rating: {details.vote_average}</h4>
              <h4>Géneros: </h4>
              <ul>
                {details.genres.map((e) => (
                  <li key={e.id}>{e.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};
