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
import bootstrap from 'bootstrap';
import Pagination from "./components/Pagination";
import { AuthProvider } from "./components/Context/authContext";
import { Icon } from '@iconify/react';
// Styles
import "./css/app.css";
import "./css/bootstrap.min.css";
import "./css/glassmorphism.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./components/Context/authContext";
import { ResetPassword } from "./components/ResetPassword";
import { PerfilUsuario } from "./components/PerfilUsuario";
import { Recommendations } from "./components/Recommendations";
import { HotCharacters } from "./components/HotCharacters";
import { BrutalMoments } from "./components/BrutalMoments";

const App = () => {
  const [favs, setFavs] = useState([]);
  const [checked, setChecked] = useState(false);
  const { user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState([]);

  const handleToggleContent = (index) => {
    setShowContent((prevShowContent) => {
      const newShowContent = [...prevShowContent];
      newShowContent[index] = !newShowContent[index];
      return newShowContent;
    });
  };

  useEffect(() => {
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
        setFavs([]);
      }
    }
  }, [user, loading]);

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
              path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/"
              element={
                <Listado
                  favs={favs}
                  addOrRemoveFromFavorites={addOrRemoveFromFavorites}
                  showContent={showContent} handleToggleContent={handleToggleContent}
                />
              }
            />
            <Route exact path="/detalle" element={<Detalle favs={favs}
              addOrRemoveFromFavorites={addOrRemoveFromFavorites}
              showContent={showContent} handleToggleContent={handleToggleContent} />} />
            <Route exact path="/resultados" element={<Resultados favs={favs}
              addOrRemoveFromFavorites={addOrRemoveFromFavorites}
              showContent={showContent} handleToggleContent={handleToggleContent} />} />
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
            <Route exact path="/profile" element={<ProtectedRoute><PerfilUsuario /></ProtectedRoute>} />
            <Route exact path="/recommendations" element={<Recommendations />} />
            <Route exact path="/nsfw/hot-characters" element={<ProtectedRoute><HotCharacters /></ProtectedRoute>} />
            <Route exact path="/nsfw/brutal-moments" element={<ProtectedRoute><BrutalMoments /></ProtectedRoute>} />

          </Routes>
        </AuthProvider>
        {/*  <Footer /> */}
      </div>
    </>
  );
};

export default App;
