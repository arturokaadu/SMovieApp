import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { HeartSwitch } from "@anatoliygatt/heart-switch";

export const Favoritos = ({ addOrRemoveFromFavorites, favs,showContent, handleToggleContent }) => {

  let token = sessionStorage.getItem('token');


  return (
    

    <div className="row">
    {!token && <Navigate to="/" />}
      {!favs.length && <div className="col-12 text-danger">No hay nada en favoritos</div>}
        {favs.map((e, index) => {
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
                  src={`${e.imgURL}`}
                  className="cardImg"
                  alt="..."
                />
                <HeartSwitch
                  className="favourite-btn"
                  data-movie-id={e.id}
                  onClick={addOrRemoveFromFavorites(movieData)}
                  checked={favs.find((fav) => fav.id === e.id) ? true : false}
                />
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
  
  
    );
};
