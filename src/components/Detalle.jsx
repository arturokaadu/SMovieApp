import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import defaultImage from '../Assets/default.jpg';
import { Link } from "react-router-dom";
export const Detalle = () => {
  let getToken = sessionStorage.getItem("token");
  //try this with useParams
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
  console.log(details);
  const navigate = useNavigate();
  return (
    <>
{/*       {!getToken && <Navigate to="/" />} */}
      {!details && <p>Loading...</p>}
      {details && (
        <>
          <div className="row">
            <div className="col-4">
              <img
                src={
                  details.poster_path !== `https://image.tmdb.org/t/p/w500/null` ?
                     `https://image.tmdb.org/t/p/w500/${details.poster_path}`
                 : defaultImage
                }
                onError={(e) => {e.target.src = defaultImage}} 
                className="img-fluid mr-5"
                alt="poster"
                />
            </div>
            <div className="col-8">
              <h2 className="text-black">{details.title}</h2>
              <h5 className="mt-5 text-muted">Release Date: {details.release_date}</h5>
              <h5 className="text-muted">Géneros: </h5>

              {console.log('value of navigate', navigate)}
              {details.genres.map((e) => (
                
                <button
                  onClick={() => navigate(`/resultados?genre=${e.id}`)}
                  className="genre-btn"
                  key={e.id}
                >
                  {e.name}
                </button>
              ))}

              <h5 className="mt-4 text-muted">Reseña:</h5>
              <p className="text-muted">{details.overview}</p>
              <h5 className="mt-4 text-muted">
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
