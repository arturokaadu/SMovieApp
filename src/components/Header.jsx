import { faVanShuttle } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { Busqueda } from "./Busqueda";
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import bootstrap from 'bootstrap';
import { useState } from "react";
export const Header = (favs) => {
  const navigate = useNavigate();
  const { user, logout, loading, isAdult } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">

      <div className="container-fluid">
        <Link className="navbar-brand neon-text fw-bold" to="/">
          <i className="bi bi-play-circle-fill me-2"></i>
          AnimeNexus
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""
            }`}
        >

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-nowrap">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-fire me-1"></i>
                Trending
              </Link>
            </li>

            {/* Explore Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-compass me-1"></i> Explore
              </a>
              <ul className="dropdown-menu dropdown-menu-dark glass-panel p-0 border-0">
                <li><Link className="dropdown-item" to="/genre/action">Action</Link></li>
                <li><Link className="dropdown-item" to="/genre/adventure">Adventure</Link></li>
                <li><Link className="dropdown-item" to="/genre/comedy">Comedy</Link></li>
                <li><Link className="dropdown-item" to="/genre/drama">Drama</Link></li>
                <li><Link className="dropdown-item" to="/genre/fantasy">Fantasy</Link></li>
                <li><Link className="dropdown-item" to="/genre/horror">Horror</Link></li>
                <li><Link className="dropdown-item" to="/genre/mystery">Mystery</Link></li>
                <li><Link className="dropdown-item" to="/genre/romance">Romance</Link></li>
                <li><Link className="dropdown-item" to="/genre/sci-fi">Sci-Fi</Link></li>
                <li><Link className="dropdown-item" to="/genre/shonen">Shonen</Link></li>
                <li><Link className="dropdown-item" to="/genre/seinen">Seinen</Link></li>
                <li><Link className="dropdown-item" to="/genre/shoujo">Shoujo</Link></li>
                <li><Link className="dropdown-item" to="/genre/slice-of-life">Slice of Life</Link></li>
                <li><Link className="dropdown-item" to="/genre/sports">Sports</Link></li>
                <li><Link className="dropdown-item" to="/genre/supernatural">Supernatural</Link></li>
                <li><Link className="dropdown-item" to="/genre/thriller">Thriller</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/top-movies">Top Movies</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/recommendations">
                <i className="bi bi-gem me-1" style={{ color: '#00d4ff' }}></i>
                Hidden Gems
              </Link>
            </li>

            {/* NSFW Menu (18+ Only) */}
            {user && user.dob && isAdult(user.dob) && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-danger" href="#" role="button" data-bs-toggle="dropdown">
                  <i className="bi bi-exclamation-diamond-fill me-1"></i> NSFW
                </a>
                <ul className="dropdown-menu dropdown-menu-dark glass-panel p-0 border-0">
                  <li><Link className="dropdown-item text-danger" to="/nsfw/hot-characters">Hot Characters</Link></li>
                  <li><Link className="dropdown-item text-danger" to="/nsfw/brutal-moments">Brutal Moments</Link></li>
                </ul>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}

            {user && favs.favs.length > 0 && (
              <li className="nav-item">
                <Link className="nav-link" to="/favoritos">
                  <i className="bi bi-heart-fill me-1 text-danger"></i>
                  Favorites ({favs.favs.length})
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Busqueda />

            {user ? (
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <div className="btn-group">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
      <div className="dark-mode-toggle-container">
        <DarkModeToggle />
      </div>
    </nav>
  );
};
