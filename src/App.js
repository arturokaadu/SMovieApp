import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Register } from "./components/Register";
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
import bootstrap from 'bootstrap';
import Pagination from "./components/Pagination";
import { AuthProvider } from "./components/Context/authContext";
import { Icon } from '@iconify/react';
// Styles
import "./css/app.css";
import "./css/bootstrap.min.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./components/Context/authContext";
import { ResetPassword } from "./components/ResetPassword";
const App = () => {
  const [favs, setFavs] = useState([]);
  const [movieDat, setMovieDat] = useState([]);
  const [checked, setChecked] = useState(false);
  const {user, loading} = useAuth()
  const [isLoading, setIsLoading] = useState(true);
//console.log({user} = useAuth());
  const [showContent, setShowContent] = useState([]);
 //const { user} = useAuth();
  const handleToggleContent = (index) => {
    setShowContent((prevShowContent) => {
      const newShowContent = [...prevShowContent];
      newShowContent[index] = !newShowContent[index];
      return newShowContent;
    });
  };

  useEffect(() => {
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
      if (!loading) {
        if (user) {
          // User is logged in, get their favorites from local storage
          const favsInLocal = localStorage.getItem('favs');
          if (favsInLocal !== null) {
            const favsArr = JSON.parse(favsInLocal);
            setFavs(favsArr);
          }
        } else {
          // User is logged out, clear the favorites from local storage
          //localStorage.removeItem('favs');
          setFavs([]);
        }
      }
  }, [user,loading]);

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
      localStorage.setItem("favId", movieData.id);
      console.log("movie added");
    /*  checked = { checked }; */
      setChecked(true);
    } else {
      let moviesLeft = tempMovie.filter((e) => {
        return e.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));

      setFavs(moviesLeft);
      localStorage.removeItem("favId");
      console.log("movie deleted");
      setChecked(false);
        if (!user) {
        localStorage.removeItem("favs");
        setFavs([]);
      }  
    }
  };
 
  return (
    <>
      <div>
        <AuthProvider>
        <Header favs={favs} />

        <Routes>
          <Route exact
            path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
           
              <Listado
                favs={favs}
                movieDat={movieDat}
                addOrRemoveFromFavorites={addOrRemoveFromFavorites}
                showContent={showContent} handleToggleContent={handleToggleContent}
              />
              
            }
          />
          <Route exact path="/detalle" element={<Detalle favs={favs}
                addOrRemoveFromFavorites={addOrRemoveFromFavorites}
                showContent={showContent} handleToggleContent={handleToggleContent}/>} />
          <Route   exact path="/resultados" element={<Resultados favs={favs}
                movieDat={movieDat}
                addOrRemoveFromFavorites={addOrRemoveFromFavorites}
                showContent={showContent} handleToggleContent={handleToggleContent}/>} />
          <Route
            exact
            path="/favoritos"
            element={
              <Favoritos
                favs={favs}
                addOrRemoveFromFavorites={addOrRemoveFromFavorites}
                showContent={showContent} handleToggleContent={handleToggleContent}
              />
            }
            />   <Route
            exact
          path="/resetPassword"
          element={
            <ResetPassword
              />
          }
        />

        </Routes>
        </AuthProvider>
        {/*  <Footer /> */}
      </div>
    </>
  );
};

export default App;
