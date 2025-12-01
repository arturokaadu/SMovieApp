import { useState, useEffect } from "react";
import { useAuth } from "./Context/authContext";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { searchCharacters } from "../services/animeService";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

export const PerfilUsuario = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [topCharacters, setTopCharacters] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                navigate("/login");
                return;
            }
            setLoading(true);
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTopCharacters(docSnap.data().topCharacters || []);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, navigate]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setSearching(true);
        try {
            const data = await searchCharacters(searchQuery);
            setSearchResults(data.data);
        } catch (error) {
            console.error("Error searching characters:", error);
            swal("Error", "Could not search characters", "error");
        } finally {
            setSearching(false);
        }
    };

    const addCharacter = async (char) => {
        if (topCharacters.length >= 50) {
            swal("Limit Reached", "You can only have 50 characters in your top list.", "warning");
            return;
        }
        if (topCharacters.find(c => c.mal_id === char.mal_id)) {
            swal("Already Added", "This character is already in your list.", "info");
            return;
        }

        const newChar = {
            mal_id: char.mal_id,
            name: char.name,
            image_url: char.images.jpg.image_url
        };

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                topCharacters: arrayUnion(newChar)
            });
            setTopCharacters([...topCharacters, newChar]);
            swal("Added!", `${char.name} added to your top list.`, "success");
            setSearchResults([]);
            setSearchQuery("");
        } catch (error) {
            console.error("Error adding character:", error);
            swal("Error", "Could not add character", "error");
        }
    };

    const removeCharacter = async (char) => {
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                topCharacters: arrayRemove(char)
            });
            setTopCharacters(topCharacters.filter(c => c.mal_id !== char.mal_id));
            swal("Removed", `${char.name} removed from your list.`, "success");
        } catch (error) {
            console.error("Error removing character:", error);
            swal("Error", "Could not remove character", "error");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="text-center mt-5"><h2>Loading Profile...</h2></div>;

    return (
        <div className="container mt-5">
            <div className="row mb-5">
                <div className="col-12 text-center text-white">
                    <h1 className="display-4">My Profile</h1>
                    <p className="lead">Welcome, {user?.username || user?.email}</p>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Top 50 Characters Section */}
            <div className="row">
                <div className="col-12">
                    <h3 className="text-white border-bottom pb-2 mb-4">My Top 50 Characters ({topCharacters.length}/50)</h3>

                    {/* Search to Add */}
                    <div className="card bg-dark text-white mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Add Character</h5>
                            <form onSubmit={handleSearch} className="d-flex gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search character name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary" disabled={searching}>
                                    {searching ? "Searching..." : "Search"}
                                </button>
                            </form>

                            {/* Search Results */}
                            {searchResults.length > 0 && (
                                <div className="mt-3 row">
                                    {searchResults.map(char => (
                                        <div className="col-md-2 col-sm-4 col-6 mb-3" key={char.mal_id}>
                                            <div className="card bg-secondary text-white h-100 border-0" onClick={() => addCharacter(char)} style={{ cursor: 'pointer' }}>
                                                <img
                                                    src={char.images.jpg.image_url}
                                                    className="card-img-top"
                                                    alt={char.name}
                                                    style={{ height: '150px', objectFit: 'cover' }}
                                                />
                                                <div className="card-body p-2 text-center">
                                                    <small>{char.name}</small>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* List Display */}
                    <div className="row">
                        {topCharacters.length > 0 ? (
                            topCharacters.map((char, index) => (
                                <div className="col-md-2 col-sm-3 col-4 mb-4" key={char.mal_id}>
                                    <div className="card bg-dark text-white h-100 border-0 position-relative">
                                        <span className="position-absolute top-0 start-0 badge bg-warning text-dark m-1">#{index + 1}</span>
                                        <button
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                                            onClick={() => removeCharacter(char)}
                                            style={{ padding: '0px 5px' }}
                                        >
                                            &times;
                                        </button>
                                        <img
                                            src={char.image_url}
                                            className="card-img-top"
                                            alt={char.name}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body text-center p-2">
                                            <h6 className="card-title mb-0" style={{ fontSize: '0.9rem' }}>{char.name}</h6>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted text-center">No characters added yet. Search and add your favorites!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
