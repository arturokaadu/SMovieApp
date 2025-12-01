import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { useAuth } from "../components/Context/authContext";
import { getAnimeDetails, getAnimeCharacters } from "../services/animeService";
import defaultImage from '../Assets/default.jpg';
import { Reviews } from "./Reviews";

export const Detalle = () => {
  let query = new URLSearchParams(window.location.search);
  let animeID = query.get("id") || query.get("MovieID"); // Support both for now

  const navigate = useNavigate();
  const { user } = useAuth();

  const [details, setDetails] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNSFWWarning, setShowNSFWWarning] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const animeData = await getAnimeDetails(animeID);
        setDetails(animeData);

        // Check NSFW
        const isNSFW = animeData.rating === "Rx - Hentai" || animeData.rating?.includes("R+");
        const userAllowsNSFW = user?.settings?.showNSFW;

        if (isNSFW && !userAllowsNSFW) {
          setShowNSFWWarning(true);
        } else {
          setContentRevealed(true);
        }

        const charsData = await getAnimeCharacters(animeID);
        setCharacters(charsData.slice(0, 10)); // Top 10 characters
      } catch (error) {
        console.error("Error fetching details:", error);
        swal(<h5>Error loading anime details</h5>);
      } finally {
        setLoading(false);
      }
    };

    if (animeID) {
      fetchData();
    }
  }, [animeID, user]);

  const handleRevealContent = () => {
    if (!user) {
      swal({
        text: "You must be logged in and over 18 to view this content.",
        buttons: {
          cancel: "Cancel",
          login: {
            text: "Login",
            value: "login",
          }
        }
      }).then((value) => {
        if (value === "login") navigate("/login");
        else navigate("/");
      });
    } else if (!user.settings?.showNSFW) {
      swal("You have not enabled NSFW content in your settings.");
      navigate("/");
    } else {
      setContentRevealed(true);
      setShowNSFWWarning(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><h2>Loading Details...</h2></div>;
  if (!details) return <div className="text-center mt-5"><h2>Anime not found</h2></div>;

  if (showNSFWWarning && !contentRevealed) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          <h3>NSFW Content Warning</h3>
          <p>This anime contains explicit content.</p>
          <button className="btn btn-danger" onClick={handleRevealContent}>
            I am over 18 and want to view this content
          </button>
          <button className="btn btn-secondary ms-2" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section / Banner */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${details.images.jpg.large_image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0',
          color: 'white',
          marginBottom: '30px'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center">
              <img
                src={details.images.jpg.large_image_url}
                alt={details.title}
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '400px', border: '2px solid #fff' }}
              />
            </div>
            <div className="col-md-8">
              <h1 className="display-4 fw-bold">{details.title}</h1>
              <p className="lead">{details.title_japanese}</p>
              <div className="mb-3">
                <span className="badge bg-primary me-2">{details.type}</span>
                <span className="badge bg-success me-2">{details.status}</span>
                <span className="badge bg-warning text-dark me-2">Score: {details.score}</span>
                <span className="badge bg-info text-dark">{details.rating}</span>
              </div>
              <p className="lead">{details.synopsis}</p>

              {/* Manga Relation Info (if available) */}
              {/* This requires parsing 'relations' from API, keeping it simple for now */}

              {details.trailer?.embed_url && (
                <a href={details.trailer.url} target="_blank" rel="noopener noreferrer" className="btn btn-danger btn-lg mt-3">
                  <i className="bi bi-youtube"></i> Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Trailer Section */}
        {details.trailer?.embed_url && (
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="mb-4 border-bottom pb-2">Trailer</h3>
              <div className="ratio ratio-16x9">
                <iframe
                  src={details.trailer.embed_url}
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Characters Section */}
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="mb-4 border-bottom pb-2">Characters</h3>
            <div className="row">
              {characters.map((char) => (
                <div className="col-md-2 col-sm-4 col-6 mb-4" key={char.character.mal_id}>
                  <div className="card bg-dark text-white h-100 border-0">
                    <img
                      src={char.character.images.jpg.image_url}
                      className="card-img-top rounded-circle mx-auto mt-3"
                      alt={char.character.name}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-center">
                      <h6 className="card-title">{char.character.name}</h6>
                      <small className="text-muted">{char.role}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="row mb-5">
          <div className="col-12">
            <Reviews animeId={animeID} />
          </div>
        </div>
      </div>
    </>
  );
};
