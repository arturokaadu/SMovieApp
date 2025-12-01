
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
import { useAuth } from "../components/Context/authContext";
import { searchAnime } from "../services/animeService";

export const Resultados = ({ addOrRemoveFromFavorites, favs, showContent, handleToggleContent }) => {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");
  const { user } = useAuth();
  const [moviesResults, setMoviesResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Determine SFW mode based on user settings
        // If user is not logged in or showNSFW is false/undefined, enable SFW filter
        const sfwMode = !user?.settings?.showNSFW;

        const data = await searchAnime(keyword, 1, sfwMode);
        const moviesArray = data.data;

        if (moviesArray.length === 0) {
          swal(<h4>No results found</h4>);
        }
        setMoviesResults(moviesArray);
      } catch (error) {
        console.error(error);
        swal(<h4>Error searching anime</h4>);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchResults();
    }
  }, [keyword, user]);

  const HandleHeartClick = (animeData) => {
    if (!user) {
      swal({
        text: "Please log in to add to favorites",
        buttons: {
          cancel: "Cancel",
          logIn: {
            text: "Log in",
            value: "logIn",
          },
        },
      }).then((value) => {
        if (value === "logIn") {
          navigate("/login");
        }
      });
      return;
    } else {
      addOrRemoveFromFavorites(animeData)();
    }
  };

  if (loading) return <div className="text-center mt-5"><h2>Searching...</h2></div>;

  return (
    <>
      <h2 className="d-flex align-items-center justify-content-center text-center mt-3">Results for: {keyword}</h2>
      <div className="row">
        {moviesResults.map((anime, index) => {
          const animeData = {
            imgURL: anime.images.jpg.large_image_url,
            overview: anime.synopsis,
            title: anime.title,
            id: anime.mal_id,
            vote_average: anime.score,
          };

          return (
            <div className="col-md-3 col-sm-6 col-12" key={anime.mal_id}>
              <div className="card text-white my-4 anime-card glass-card" style={{ overflow: 'hidden', border: 'none' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={anime.images.jpg.large_image_url}
                    className="card-img-top"
                    alt={anime.title}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <span className={`badge ${anime.status === 'Currently Airing' ? 'bg-success' : 'bg-primary'}`}>
                      {anime.status === 'Currently Airing' ? 'Airing' : anime.status}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title text-truncate" style={{ maxWidth: '80%' }} title={anime.title}>{anime.title}</h5>
                    <span className="badge bg-warning text-dark">★ {anime.score}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <HeartSwitch
                      className="favourite-btn"
                      size="sm"
                      inactiveColor="white"
                      activeColor="#ff0000"
                      data-movie-id={anime.mal_id}
                      onClick={() => HandleHeartClick(animeData)}
                      checked={favs.find((fav) => fav.id === anime.mal_id) ? true : false}
                    />
                    <Link
                      className="btn btn-sm btn-outline-light"
                      to={`/detalle?id=${anime.mal_id}`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
