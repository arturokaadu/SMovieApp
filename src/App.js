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

// Styles
import "./css/app.css";
import "./css/bootstrap.min.css";
function App() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");

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
  return (
    <>
      <div>
        <Header  favs={favs}/>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/listado"
            element={
              <Listado addOrRemoveFromFavorites={addOrRemoveFromFavorites} />
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

        <Footer />
      </div>
    </>
  );
}

export default App;
