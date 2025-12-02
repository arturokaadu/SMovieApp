import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import swal from "@sweetalert/with-react";
import Pagination from "./Pagination";
import { HeartSwitch } from "@anatoliygatt/heart-switch";
import { useAuth } from "../components/Context/authContext";
import { getTopAnime } from "../services/animeService";

export const Listado = ({
  addOrRemoveFromFavorites,
  favs,
  // movieDat, // Removed
  // checked,
  showContent,
  handleToggleContent,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12); // Increased for better grid view
  // Jikan API pagination is handled by the API itself usually, but for now let's stick to client side or hybrid. 
  // Jikan returns 25 items per page. Let's use the API pagination if possible, or just client side for the top list if we fetch enough.
  // getTopAnime returns pagination data. Let's try to use that.

  // For this refactor, I will fetch the top anime (which returns 25 items) and just display them. 
  // If we want more, we need to handle API pagination. 
  // The existing Pagination component seems to handle client-side slicing.
  // Let's keep it simple: Fetch page 1 of top anime (25 items) and display them.
  // Or better, fetch based on currentPage if we want to support "infinite" feel via pages.

  // Let's stick to the existing Pagination component logic for now (client side slicing) 
  // BUT since Jikan gives 25 items, maybe we just show all 25 and use API pagination for "Next Page"?
  // The existing code sliced `movieDat`.

  // Let's implement API-based pagination.
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const data = await getTopAnime(currentPage);
        let results = data.data;

        // Client-side NSFW filtering for Top Anime
        const showNSFW = user?.settings?.showNSFW;
        if (!showNSFW) {
          results = results.filter(anime => anime.rating !== "Rx - Hentai");
        }

        setAnimeList(results);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error loading anime:", error);
        swal(<h5>Error loading anime data</h5>);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [currentPage, user]);

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

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

  if (loading) return <div className="text-center mt-5"><h2>Loading Anime...</h2></div>;

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-white mb-4">
          <i className="bi bi-fire me-2" style={{ color: '#ff0055' }}></i>
          Trending Anime
        </h2>
      </div>
      <div className="row">
        {animeList.map((anime, index) => {
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
                  <Link to={`/detalle?id=${anime.mal_id}`}>
                    <img
                      src={anime.images.jpg.large_image_url}
                      className="card-img-top"
                      alt={anime.title}
                      style={{ height: '300px', objectFit: 'cover', cursor: 'pointer' }}
                    />
                  </Link>
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

      {/* Simple Pagination Controls for API */}
      <div className="d-flex justify-content-center mt-5 mb-5">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link bg-dark text-white" onClick={() => paging(currentPage - 1)}>Previous</button>
            </li>
            <li className="page-item disabled">
              <span className="page-link bg-dark text-white">Page {currentPage}</span>
            </li>
            <li className={`page-item ${pagination.has_next_page ? '' : 'disabled'}`}>
              <button className="page-link bg-dark text-white" onClick={() => paging(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

