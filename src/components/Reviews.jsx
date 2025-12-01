import { useState, useEffect } from "react";
import { useAuth } from "./Context/authContext";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, orderBy, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

export const Reviews = ({ animeId }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, "reviews"),
                    where("animeId", "==", animeId.toString()), // Ensure string comparison
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = await getDocs(q);
                const reviewsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                // Index might be required for compound query
            } finally {
                setLoading(false);
            }
        };

        if (animeId) {
            fetchReviews();
        }
    }, [animeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            swal({
                text: "Please log in to leave a review",
                buttons: {
                    cancel: "Cancel",
                    login: { text: "Login", value: "login" }
                }
            }).then((value) => {
                if (value === "login") navigate("/login");
            });
            return;
        }

        if (!newReview.trim()) return;

        try {
            const reviewData = {
                animeId: animeId.toString(),
                userId: user.uid,
                username: user.username || user.email.split('@')[0],
                text: newReview,
                rating: parseInt(rating),
                likes: [],
                createdAt: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, "reviews"), reviewData);
            setReviews([{ id: docRef.id, ...reviewData }, ...reviews]);
            setNewReview("");
            setRating(5);
            swal("Review added!", "Thanks for your feedback", "success");
        } catch (error) {
            console.error("Error adding review:", error);
            swal("Error", "Could not add review", "error");
        }
    };

    const handleLike = async (reviewId, likes) => {
        if (!user) return;

        const reviewRef = doc(db, "reviews", reviewId);
        const isLiked = likes.includes(user.uid);

        try {
            if (isLiked) {
                await updateDoc(reviewRef, {
                    likes: arrayRemove(user.uid)
                });
                setReviews(reviews.map(r => r.id === reviewId ? { ...r, likes: r.likes.filter(id => id !== user.uid) } : r));
            } else {
                await updateDoc(reviewRef, {
                    likes: arrayUnion(user.uid)
                });
                setReviews(reviews.map(r => r.id === reviewId ? { ...r, likes: [...r.likes, user.uid] } : r));
            }
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    return (
        <div className="mt-5">
            <h3 className="mb-4 border-bottom pb-2">Reviews</h3>

            {/* Add Review Form */}
            <div className="card bg-dark text-white mb-4">
                <div className="card-body">
                    <h5 className="card-title">Write a Review</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Rating: {rating}/10</label>
                            <input
                                type="range"
                                className="form-range"
                                min="1"
                                max="10"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control bg-secondary text-white border-0"
                                rows="3"
                                placeholder="Share your thoughts..."
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Post Review</button>
                    </form>
                </div>
            </div>

            {/* Reviews List */}
            {loading ? <p>Loading reviews...</p> : (
                reviews.length > 0 ? (
                    reviews.map(review => (
                        <div className="card bg-dark text-white mb-3" key={review.id}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h6 className="card-subtitle mb-2 text-muted">{review.username}</h6>
                                    <span className="badge bg-warning text-dark">★ {review.rating}</span>
                                </div>
                                <p className="card-text">{review.text}</p>
                                <div className="d-flex align-items-center">
                                    <button
                                        className={`btn btn-sm ${review.likes?.includes(user?.uid) ? 'btn-danger' : 'btn-outline-danger'} me-2`}
                                        onClick={() => handleLike(review.id, review.likes || [])}
                                    >
                                        <i className="bi bi-heart-fill"></i> {review.likes?.length || 0}
                                    </button>
                                    <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No reviews yet. Be the first to review!</p>
                )
            )}
        </div>
    );
};
