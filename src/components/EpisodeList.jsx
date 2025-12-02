import { useState, useEffect } from "react";
import { getAnimeEpisodes } from "../services/animeService";
import { useAuth } from "./Context/authContext";
import swal from "@sweetalert/with-react";

export const EpisodeList = ({ animeId }) => {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchEpisodes = async () => {
            setLoading(true);
            try {
                const data = await getAnimeEpisodes(animeId, page);
                setEpisodes(prev => page === 1 ? data.data : [...prev, ...data.data]);
                setHasNextPage(data.pagination.has_next_page);
            } catch (error) {
                console.error("Error fetching episodes:", error);
            } finally {
                setLoading(false);
            }
        };

        if (animeId) {
            fetchEpisodes();
        }
    }, [animeId, page]);

    const getEpisodeTypeStyle = (episode) => {
        if (episode.filler) return { borderLeft: '4px solid #fd7e14', background: 'rgba(253, 126, 20, 0.1)' }; // Orange for filler
        if (episode.recap) return { borderLeft: '4px solid #6f42c1', background: 'rgba(111, 66, 193, 0.1)' }; // Purple for recap
        return { borderLeft: '4px solid #0dcaf0', background: 'rgba(13, 202, 240, 0.05)' }; // Cyan for canon
    };

    return (
        <div className="mt-5">
            <h3 className="text-white mb-4">
                <i className="bi bi-collection-play me-2" style={{ color: '#0dcaf0' }}></i>
                Episodes
            </h3>

            <div className="row">
                {episodes.map(episode => (
                    <div className="col-12 mb-3" key={episode.mal_id}>
                        <div className="card glass-card text-white" style={getEpisodeTypeStyle(episode)}>
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    <h4 className="mb-0 text-muted">#{episode.mal_id}</h4>
                                    <div>
                                        <h5 className="mb-1">
                                            {episode.title}
                                            {episode.filler && <span className="badge bg-warning text-dark ms-2">Filler</span>}
                                            {episode.recap && <span className="badge bg-purple ms-2">Recap</span>}
                                        </h5>
                                        <small className="text-muted">
                                            {episode.aired ? new Date(episode.aired).toLocaleDateString() : 'N/A'}
                                            {episode.score && <span className="ms-2"><i className="bi bi-star-fill text-warning"></i> {episode.score}</span>}
                                        </small>
                                    </div>
                                </div>

                                <a
                                    href={episode.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-outline-light"
                                >
                                    <i className="bi bi-box-arrow-up-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {loading && (
                <div className="text-center my-3">
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {hasNextPage && !loading && (
                <div className="text-center mt-3">
                    <button
                        className="btn btn-outline-info"
                        onClick={() => setPage(prev => prev + 1)}
                    >
                        Load More Episodes
                    </button>
                </div>
            )}
        </div>
    );
};
