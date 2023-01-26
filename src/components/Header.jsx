import { faVanShuttle } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { Busqueda } from "./Busqueda";
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";
export const Header = (favs) => {

  const navigate = useNavigate();
  const {user, logout, loading} = useAuth()
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }
 if(loading) return <h1>Loading</h1>
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
              <Link className="nav-link active" aria-current="page" to="/listado">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listado">
                Peliculas más recientes
              </Link>
            </li>
         {/*    <li className="nav-item">
              
                
              
            </li> */}

            <li className="nav-item">
              {user && favs.favs.length > 0 && (
                <Link className="nav-link" to="/favoritos">
                  Favoritos
                </Link>
              )}
            </li>
            <li className="nav-item">
            {user && favs.favs.length > 0 && (
              <span className="nav-link disabled text-success">
                Peliculas en Favoritos: {favs.favs.length}
              </span>
            )}
            </li>


          </ul>
        </div>
        {user && <button className="btn btn-outline-warning" onClick={handleLogout}>Logout</button>}
        {!user && <button className="btn btn-outline-warning" onClick={handleLogout}>Login</button>}
        <Busqueda />
      </div>
    </nav>
  );
};

