import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Listado } from "./components/Listado";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Detalle } from "./components/Detalle";
import { Resultados } from "./components/Resultados";
import { Favoritos } from "./components/Favoritos";
import { Navigate } from "react-router-dom";
import swal from "@sweetalert/with-react";
import axios from "axios";
import Pagination from "./components/Pagination";
// Styles
import "./css/app.css";
import "./css/bootstrap.min.css";
const App = () => {
  const [favs, setFavs] = useState([]);
  const [movieDat, setMovieDat] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [ postsPerPage, setPostPerPage] = useState(8);
  useEffect( () => {
    const favsInLocal = localStorage.getItem("favs");

    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=2bda57bf0144e50a24fef4fbd75dcde8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
    axios
      .get(endPoint)
      
      .then((response) => {
        const apiData = response.data;
        setMovieDat(apiData.results);
      })
      .catch((error) => {
        swal(<h5> Error, try again later</h5>);
      });

    
    if (favsInLocal !== null) {
      const favsArr = JSON.parse(favsInLocal);

      setFavs(favsArr);
    }
  }, []);

  const navigate = useNavigate();

  const addOrRemoveFromFavorites = (movieData) => (e) => {
    const favMovies = localStorage.getItem("favs");
    let tempMovie;

    if (favMovies === null) {
      tempMovie = [];
    } else {
      tempMovie = JSON.parse(favMovies);
    }

    let filterM = tempMovie.find((e) => {
      {
        return e.id === movieData.id;
      }
    });

    if (!filterM) {
      tempMovie.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMovie));
      setFavs(tempMovie);
      console.log("movie added");
    } else {
      let moviesLeft = tempMovie.filter((e) => {
        return e.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));

      setFavs(moviesLeft);

      console.log("movie deleted");
    }
  };

  const lasPostIndex = currentPage * postsPerPage
  const firstPostIndex = lasPostIndex - postsPerPage;
  const currentPost = movieDat.slice(firstPostIndex, lasPostIndex)

 console.log(currentPost);
  
  return (
    <>
      <div>
        <Header favs={favs} />

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/listado"
            element={
              <Listado movieDat={currentPost}  addOrRemoveFromFavorites={addOrRemoveFromFavorites} />
            }
          />
          <Route exact path="/detalle" element={<Detalle />} />
          <Route exact path="/resultados" element={<Resultados />} />
          <Route
            exact
            path="/favoritos"
            element={
              <Favoritos
                favs={favs}
                addOrRemoveFromFavorites={addOrRemoveFromFavorites}
              />
            }
          />
        </Routes>
        <Pagination totalPosts={movieDat.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>
        <Footer />
      </div>
    </>
  );
}

export default App;
