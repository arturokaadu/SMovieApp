import { faVanShuttle } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { Busqueda } from "./Busqueda";
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import bootstrap from 'bootstrap' ;
import { useState } from "react";
export const Header = (favs) => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  // if(loading) return <h1>Loading</h1>
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Movies App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            isMobileMenuOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav text-nowrap">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Peliculas más recientes
              </Link>
            </li>
            {user && favs.favs.length > 0 && (
              <li className="nav-item">
                <Link className="nav-link" to="/favoritos">
                  Favoritos
                </Link>
              </li>
            )}
            {user && favs.favs.length > 0 && (
              <li className="nav-item">
                <span className="nav-link disabled text-success">
                  Peliculas en Favoritos: {favs.favs.length}
                </span>
              </li>
            )}
          </ul>
          <div className="btn-group">
            {user ? (
              <button
                className="btn btn-outline-warning"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-outline-warning"
                onClick={handleLogout}
              >
                Login
              </button>
            )}
            <Busqueda />
          </div>
        </div>
      </div>
    </nav>
  );
};

