import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
//import swal from "@sweetalert/with-react";
import Pagination from "./Pagination";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
//import {Collapse} from bootstrap

export const Listado = ({
  addOrRemoveFromFavorites,
  favs,
  movieDat,
  checked,
  showContent, handleToggleContent
}) => {
  let getToken = sessionStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(4);

  const lasPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lasPostIndex - postsPerPage;
  const currentPost = movieDat.slice(firstPostIndex, lasPostIndex);

  //console.log(currentPost);

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            vote_average: e.vote_average
          };

          return (
            <div className="col-3" key={index}>
              <div className="card text-white bg-dark my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
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
        <div className=" d-flex justify-content-center mt-5">
          <Pagination
            totalPosts={movieDat.length}
            postsPerPage={postsPerPage}
            paging={paging}
          />
        </div>
      </div>
    </>
  );
};
