import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import defaultImage from '../Assets/default.jpg'
export const Detalle = () => {
  let getToken = sessionStorage.getItem("token");
  //try this with useParams
  const navigate = useNavigate();
  let query = new URLSearchParams(window.location.search);
  //back here if it sets on fire MovieID
  let movieID = query.get("MovieID");

  //console.log(movieID);

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
          <div className="row">
            <div className="col-4">
              <img
                src={
                  details.poster_path ?
                     `https://image.tmdb.org/t/p/w500/${details.poster_path}`
                 : defaultImage
                }
                onError={(e) => {e.target.src = defaultImage}} 
                className="img-fluid mr-5"
                alt="poster"
              />
            </div>
            <div className="col-8">
              <h2>{details.title}</h2>
              <h5 className="mt-5">Release Date: {details.release_date}</h5>
              <h5 className="">Géneros: </h5>

              {details.genres.map((e) => (
                <button
                  onClick={() => navigate(`/resultados?genre=${e.id}`)}
                  className="genre-btn"
                  key={e.id}
                >
                  {e.name}
                </button>
              ))}

              <h5 className="mt-4">Reseña:</h5>
              <p>{details.overview}</p>
              <h5 className="mt-4">
                Rating:{" "}
                <div className="vote-average d-flex align-items-center justify-content-center mt-3">
                  {Math.round(details.vote_average)}
                </div>
              </h5>
            </div>
          </div>
        </>
      )}
    </>
  );
};
