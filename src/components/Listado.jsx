import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../firebase";
import swal from "@sweetalert/with-react";
import Pagination from "./Pagination";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
//import {Collapse} from bootstrap
import { useAuth } from "../components/Context/authContext";
export const Listado = ({
  addOrRemoveFromFavorites,
  favs,
  movieDat,
  checked,
  showContent,
  handleToggleContent,
}) => {
  let getToken = sessionStorage.getItem("token");
  const navigate = useNavigate();
  /* const authContext = useContext(context)
  console.log(authContext ); */
  const authContext = useAuth();
  /* console.log(authContext); */
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(4);

  const { user } = useAuth();
  /*   console.log(user); */
  const lasPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lasPostIndex - postsPerPage;
  const currentPost = movieDat.slice(firstPostIndex, lasPostIndex);

  //console.log(currentPost);

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
   /*    if (!user) {
        navigate("/login");
      } */
    });
  }, []);

  const HandleHeartClick = (movieData) => {
    if (!user) {
      swal({
        text: "Please log in to add to favorites",
        buttons: {
          cancel: "Cancel",
          logIn: {
            text: "Log in",
            value: "logIn",
          },
        },
      }).then((value) => {
        if (value === "logIn") {
          navigate("/login");
        }
      });
      return;
    }else{
    addOrRemoveFromFavorites(movieData)();
  }
  }

  return (
    <>
      {/*       {!getToken && <Navigate to="/" />}
       */}
      <div className="row">
        {currentPost.map((e, index) => {
          const movieData = {
            imgURL: `https://image.tmdb.org/t/p/w500/${e.poster_path}`,
            overview: e.overview,
            title: e.title,
            id: e.id,
            vote_average: e.vote_average,
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
                   /*  onClick={addOrRemoveFromFavorites(movieData)} */
                   onClick={()=> HandleHeartClick(movieData)}
                    checked={favs.find((fav) => fav.id === e.id) ? true : false}
                  />
                  <span className="vote-average d-flex align-items-center justify-content-center">
                    {e.vote_average}
                  </span>
                </div>
                <div className="card-container">
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

                      <div className={`truncateText ${showContent[index] ? "" : "hidden"}`}>
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
