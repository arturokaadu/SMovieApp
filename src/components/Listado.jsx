import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import swal from "@sweetalert/with-react";
import Pagination from "./Pagination";
import axios from "axios";
//import {Collapse} from bootstrap

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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(4);

  const lasPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lasPostIndex - postsPerPage;
  const currentPost = movieDat.slice(firstPostIndex, lasPostIndex);

  console.log(currentPost);

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [show, setshow] = useState(true);

  const [showContent, setShowContent] = useState([]);

  const handleToggleContent = (index) => {
    setShowContent((prevShowContent) => {
      const newShowContent = [...prevShowContent];
      newShowContent[index] = !newShowContent[index];
      return newShowContent;
    });
  };

  return (
    <>
      {!getToken && <Navigate to="/" />}

      <div className="row">
        {currentPost.map((e, index) => {
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
                  className="cardImg"
                  alt="..."
                />
                <button
                  className="favourite-btn"
                  data-movie-id={e.id}
                  onClick={addOrRemoveFromFavorites(movieData)}
                >
                  🖤
                </button>
                <div className="cardBody">
                  <h5 className="card-title">{e.title}</h5>

                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary "
                      onClick={() => handleToggleContent(index)}
                    >
                      {showContent[index] ? "ocultar" : "Mostrar Sinopsis"}

                      <div>
                        {showContent[index] && <span>{e.overview}</span>}
                      </div>
                    </button>
                  </div>
                  <Link
                    className="btn btn-primary mt-2 d-flex justify-content-center"
                    to={`/detalle?MovieID=${e.id}`}
                  >
                    Detail{" "}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        <Pagination
          totalPosts={movieDat.length}
          postsPerPage={postsPerPage}
          paging={paging}
        />
      </div>
    </>
  );
};
