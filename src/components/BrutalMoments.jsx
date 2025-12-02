import { useEffect, useState } from "react";
import { getTopAnime } from "../services/animeService"; // Using top anime as placeholder for now
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react";

export const BrutalMoments = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, isAdult } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.dob || !isAdult(user.dob)) {
            swal("Restricted Content", "You must be 18+ to view this page.", "error");
            navigate("/");
            return;
        }

        const fetchContent = async () => {
            setLoading(true);
            try {
                // Fetching top anime as a placeholder. 
                // Ideally, this would be a curated list of anime known for gore/brutality (e.g., Berserk, Elfen Lied)
                const data = await getTopAnime(1, 'bypopularity');
                setAnimeList(data.data.slice(0, 8));
            } catch (error) {
                console.error("Error fetching content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [user, navigate, isAdult]);

    if (loading) return <div className="text-center mt-5"><h2>Loading Content...</h2></div>;

    return (
        <div className="container mt-5">
            <div className="alert alert-danger mb-4">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>NSFW Content (18+)</strong> - Contains extreme violence and gore.
            </div>

            <h2 className="text-danger mb-4">
                <i className="bi bi-droplet-fill me-2"></i>
                Brutal Moments & Gore
            </h2>

            <div className="row">
                {animeList.map(anime => (
                    <div className="col-md-6 mb-4" key={anime.mal_id}>
                        <div className="card glass-card h-100 border-danger">
                            <div className="row g-0 h-100">
                                <div className="col-md-4">
                                    <img
                                        src={anime.images.jpg.large_image_url}
                                        className="img-fluid rounded-start h-100"
                                        alt={anime.title}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title text-white">{anime.title}</h5>
                                        <p className="card-text text-muted">
                                            {anime.synopsis ? (anime.synopsis.length > 150 ? anime.synopsis.substring(0, 150) + '...' : anime.synopsis) : 'No description.'}
                                        </p>
                                        <div className="d-flex gap-2">
                                            <span className="badge bg-danger">Gore</span>
                                            <span className="badge bg-dark border border-danger">Violence</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
