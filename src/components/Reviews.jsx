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
    const [hoveredStar, setHoveredStar] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, "reviews"),
                    where("animeId", "==", animeId.toString()),
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

        if (!newReview.trim()) {
            swal("Empty Review", "Please write something about this anime", "warning");
            return;
        }

        if (newReview.length > 280) {
            swal("Too Long", "Your review must be 280 characters or less", "warning");
            return;
        }

        try {
            const reviewData = {
                animeId: animeId.toString(),
                userId: user.uid,
                username: user.username || user.email.split('@')[0],
                text: newReview,
                rating: rating,
                likes: [],
                createdAt: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, "reviews"), reviewData);
            setReviews([{ id: docRef.id, ...reviewData }, ...reviews]);
            setNewReview("");
            setRating(5);
            swal("✅ Review Added!", "Thanks for your feedback", "success");
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

    const renderStars = (currentRating, isInteractive = false) => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            const isFilled = isInteractive
                ? (hoveredStar > 0 ? starValue <= hoveredStar : starValue <= currentRating)
                : starValue <= currentRating;

            return (
                <i
                    key={starValue}
                    className={`bi bi-star${isFilled ? '-fill' : ''}`}
                    style={{
                        color: isFilled ? '#ffd700' : '#666',
                        fontSize: isInteractive ? '2rem' : '1rem',
                        cursor: isInteractive ? 'pointer' : 'default',
                        marginRight: '5px',
                        transition: 'color 0.2s'
                    }}
                    onClick={() => isInteractive && setRating(starValue)}
                    onMouseEnter={() => isInteractive && setHoveredStar(starValue)}
                    onMouseLeave={() => isInteractive && setHoveredStar(0)}
                />
            );
        });
    };

    return (
        <div className="mt-5">
            <h3 className="mb-4 border-bottom pb-2 text-white">
                <i className="bi bi-chat-dots me-2" style={{ color: '#ff0055' }}></i>
                Reviews
            </h3>

            {/* Add Review Form */}
            <div className="card glass-card text-white mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">Share Your Thoughts</h5>
                    <form onSubmit={handleSubmit}>
                        {/* Star Rating */}
                        <div className="mb-3">
                            <label className="form-label d-block">Your Rating:</label>
                            <div className="star-rating mb-2">
                                {renderStars(rating, true)}
                            </div>
                            <small className="text-muted">
                                {rating === 1 && "Terrible"}
                                {rating === 2 && "Poor"}
                                {rating === 3 && "Average"}
                                {rating === 4 && "Good"}
                                {rating === 5 && "Excellent"}
                            </small>
                        </div>

                        {/* Review Text */}
                        <div className="mb-3">
                            <label className="form-label">Quick Review (max 280 chars)</label>
                            <textarea
                                className="form-control bg-secondary text-white border-0"
                                rows="3"
                                placeholder="What did you think of this anime?"
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                maxLength={280}
                                required
                            ></textarea>
                            <small className="text-muted float-end mt-1">
                                {newReview.length}/280
                            </small>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            <i className="bi bi-send me-2"></i>
                            Post Review
                        </button>
                    </form>
                </div>
            </div>

            {/* Reviews List */}
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                reviews.length > 0 ? (
                    reviews.map(review => (
                        <div className="card glass-card text-white mb-3" key={review.id}>
                            <div className="card-body">
                                <div className="d-flex align-items-start">
                                    {/* Avatar */}
                                    <div className="me-3">
                                        <div
                                            className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                                            style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
                                        >
                                            {review.username.charAt(0).toUpperCase()}
                                        </div>
                                    </div>

                                    {/* Review Content */}
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h6 className="mb-0">{review.username}</h6>
                                                <div className="stars-small">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <small className="text-muted">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </small>
                                        </div>
                                        <p className="card-text mb-2">{review.text}</p>

                                        {/* Like Button */}
                                        <button
                                            className={`btn btn-sm ${review.likes?.includes(user?.uid) ? 'btn-danger' : 'btn-outline-danger'}`}
                                            onClick={() => handleLike(review.id, review.likes || [])}
                                        >
                                            <i className={`bi bi-heart${review.likes?.includes(user?.uid) ? '-fill' : ''} me-1`}></i>
                                            {review.likes?.length || 0}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center my-5">
                        <i className="bi bi-chat-square-text" style={{ fontSize: '3rem', color: '#666' }}></i>
                        <p className="text-muted mt-3">No reviews yet. Be the first to share your thoughts!</p>
                    </div>
                )
            )}
        </div>
    );
};
