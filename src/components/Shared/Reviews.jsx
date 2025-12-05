import { useState, useEffect } from "react";
import { useAuth } from "../Context/authContext";
import { db } from "../../firebase";
import { collection, addDoc, query, where, getDocs, orderBy, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import {
    ReviewsContainer,
    ReviewsHeader,
    ReviewForm,
    TextArea,
    SubmitButton,
    ReviewCard,
    ReviewHeader,
    UserInfo,
    Avatar,
    ReviewText,
    LikeButton,
    StarContainer
} from './Reviews.styles';

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
            toast.error("Please log in to leave a review");
            setTimeout(() => navigate("/login"), 1500);
            return;
        }

        if (!newReview.trim()) {
            toast.error("Please write something about this anime");
            return;
        }

        if (newReview.length > 280) {
            toast.error("Your review must be 280 characters or less");
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
            toast.success("Review Added!");
        } catch (error) {
            console.error("Error adding review:", error);
            toast.error("Could not add review");
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
                <Icon
                    key={starValue}
                    icon={isFilled ? "bi:star-fill" : "bi:star"}
                    style={{
                        color: isFilled ? '#fbbf24' : '#4b5563',
                        fontSize: isInteractive ? '1.5rem' : '1rem',
                        cursor: isInteractive ? 'pointer' : 'default',
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
        <ReviewsContainer>
            <ReviewsHeader>
                <Icon icon="bi:chat-dots-fill" style={{ color: '#ef4444' }} />
                Reviews
            </ReviewsHeader>

            <ReviewForm onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Your Rating</label>
                    <StarContainer>
                        {renderStars(rating, true)}
                    </StarContainer>
                </div>

                <TextArea
                    rows="3"
                    placeholder="What did you think of this anime?"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    maxLength={280}
                    required
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{newReview.length}/280</span>
                    <SubmitButton type="submit">
                        <Icon icon="bi:send-fill" /> Post Review
                    </SubmitButton>
                </div>
            </ReviewForm>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <Icon icon="svg-spinners:3-dots-fade" style={{ fontSize: '2rem', color: '#00d4ff' }} />
                </div>
            ) : (
                reviews.length > 0 ? (
                    reviews.map(review => (
                        <ReviewCard key={review.id}>
                            <ReviewHeader>
                                <UserInfo>
                                    <Avatar>{review.username.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        <h6 style={{ margin: 0 }}>{review.username}</h6>
                                        <StarContainer style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
                                            {renderStars(review.rating)}
                                        </StarContainer>
                                    </div>
                                </UserInfo>
                                <small style={{ opacity: 0.5 }}>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </small>
                            </ReviewHeader>

                            <ReviewText>{review.text}</ReviewText>

                            <LikeButton
                                $liked={review.likes?.includes(user?.uid)}
                                onClick={() => handleLike(review.id, review.likes || [])}
                            >
                                <Icon icon={review.likes?.includes(user?.uid) ? "bi:heart-fill" : "bi:heart"} />
                                {review.likes?.length || 0}
                            </LikeButton>
                        </ReviewCard>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                        <Icon icon="bi:chat-square-text" style={{ fontSize: '3rem', marginBottom: '1rem' }} />
                        <p>No reviews yet. Be the first to share your thoughts!</p>
                    </div>
                )
            )}
        </ReviewsContainer>
    );
};
