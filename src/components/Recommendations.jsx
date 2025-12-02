import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopAnime } from "../services/animeService";

export const Recommendations = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                // Fetch top anime but sort by rating/score to find high quality ones
                // Jikan doesn't have a "hidden gems" filter, so we'll fetch top rated and maybe filter client side if needed
                // or just show top rated as "Highly Recommended"
                const data = await getTopAnime(1, 'favorite');
                setAnimeList(data.data.slice(0, 12)); // Show top 12
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-white mb-4">
                <i className="bi bi-gem me-2" style={{ color: '#00d4ff' }}></i>
                Hidden Gems & Recommendations
            </h2>
            <p className="text-muted mb-5">Curated list of highly rated anime you might have missed.</p>

            <div className="row">
                {animeList.map((anime) => (
                    <div className="col-md-3 col-sm-6 mb-4" key={anime.mal_id}>
                        <div className="card glass-card h-100 anime-card">
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
                            <div className="card-body">
                                <h5 className="card-title text-white text-truncate">{anime.title}</h5>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="badge bg-warning text-dark">
                                        <i className="bi bi-star-fill me-1"></i>
                                        {anime.score}
                                    </span>
                                    <Link to={`/detalle?id=${anime.mal_id}`} className="btn btn-sm btn-outline-info">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
