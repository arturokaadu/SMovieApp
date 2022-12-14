import { faVanShuttle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Busqueda } from "./Busqueda";
export const Header = (favs) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Movies App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listado">
                listado
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                contacto
              </Link>
            </li>

            <li className="nav-item">
              {favs.favs.length > 0 && (
                <Link className="nav-link" to="/favoritos">
                  Favoritos
                </Link>
              )}
            </li>
            <li className="nav-item">
              <span className="nav-link disabled text-success">
                Peliculas en Favoritos: {favs.favs.length}
              </span>
            </li>
          </ul>
        </div>
        <Busqueda />
      </div>
    </nav>
  );
};

<header>
  <nav>
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </nav>
</header>;
