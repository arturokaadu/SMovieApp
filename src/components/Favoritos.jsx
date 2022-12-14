import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
export const Favoritos = ({ addOrRemoveFromFavorites, favs }) => {

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
              <div className="card my-4">
                <img
                  src={e.imgURL}
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
  
  
    );
};
