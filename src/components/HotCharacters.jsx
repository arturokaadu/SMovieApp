import { useEffect, useState } from "react";
import { searchCharacters } from "../services/animeService";
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react";

export const HotCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, isAdult } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.dob || !isAdult(user.dob)) {
            swal("Restricted Content", "You must be 18+ to view this page.", "error");
            navigate("/");
            return;
        }

        const fetchCharacters = async () => {
            setLoading(true);
            try {
                // Since Jikan doesn't have a "hot" filter, we'll fetch popular characters
                // In a real app, this would come from a curated database or specific API
                const data = await searchCharacters("popular");
                setCharacters(data.data);
            } catch (error) {
                console.error("Error fetching characters:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [user, navigate, isAdult]);

    if (loading) return <div className="text-center mt-5"><h2>Loading Content...</h2></div>;

    return (
        <div className="container mt-5">
            <div className="alert alert-danger mb-4">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>NSFW Content (18+)</strong> - Contains mature themes.
            </div>

            <h2 className="text-danger mb-4">
                <i className="bi bi-fire me-2"></i>
                Hot Characters
            </h2>

            <div className="row">
                {characters.map(char => (
                    <div className="col-md-3 col-sm-6 mb-4" key={char.mal_id}>
                        <div className="card glass-card h-100 border-danger">
                            <img
                                src={char.images.jpg.image_url}
                                className="card-img-top"
                                alt={char.name}
                                style={{ height: '350px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title text-white">{char.name}</h5>
                                <p className="text-muted small">
                                    {char.about ? (char.about.length > 100 ? char.about.substring(0, 100) + '...' : char.about) : 'No description available.'}
                                </p>
                                <a href={char.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger btn-sm w-100">
                                    View Full Profile
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
