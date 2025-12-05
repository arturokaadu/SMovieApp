import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchAnime } from '../../services/animeService';
import toast from 'react-hot-toast';
import { useAuth } from '../Context/authContext';
import { Icon } from '@iconify/react';
import { AnimeCard } from '../Shared/AnimeCard';
import {
    Container,
    Header,
    Grid,
    LoadingContainer,
    EmptyState
} from './GenrePage.styles';

export const GenrePage = ({ favs, addOrRemoveFromFavorites }) => {
    const { genre } = useParams();
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    const genreMap = {
        action: 1, adventure: 2, comedy: 4, drama: 8, fantasy: 10,
        horror: 14, mystery: 7, romance: 22, 'sci-fi': 24, shonen: 27,
        seinen: 42, shoujo: 25, 'slice-of-life': 36, sports: 30,
        supernatural: 37, thriller: 41
    };

    useEffect(() => {
        const fetchGenreAnime = async () => {
            setLoading(true);
            try {
                const genreId = genreMap[genre.toLowerCase()];
                let results;

                if (genreId) {
                    results = await searchAnime('', 1, true, genreId);
                } else {
                    results = await searchAnime(genre);
                }

                setAnimeList(results.data || []);
            } catch (error) {
                console.error("Error fetching genre:", error);
                toast.error("Error loading anime for this genre");
            } finally {
                setLoading(false);
            }
        };

        if (genre) {
            fetchGenreAnime();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genre]);

    const HandleHeartClick = (e, anime) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            toast.error("Please log in to add to favorites");
            setTimeout(() => navigate("/login"), 1500);
            return;
        }
        addOrRemoveFromFavorites(anime);
    };

    if (loading) return (
        <LoadingContainer>
            <div className="spinner"></div>
            <style>{`
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid rgba(255, 255, 255, 0.1);
                    border-top: 5px solid #fbbf24;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </LoadingContainer>
    );

    return (
        <Container>
            <Header>
                <Icon icon="bi:tag-fill" />
                Genre: {genre.replace('-', ' ')}
            </Header>

            {animeList.length === 0 ? (
                <EmptyState>
                    <h4>No results found for this genre.</h4>
                </EmptyState>
            ) : (
                <Grid>
                    {animeList.map((anime) => {
                        const animeData = {
                            id: anime.mal_id,
                            title: anime.title,
                            img: anime.images.jpg.large_image_url,
                            overview: anime.synopsis,
                            vote_average: anime.score,
                        };
                        const isFav = favs ? favs.find((fav) => fav.id === anime.mal_id) : false;

                        return (
                            <AnimeCard
                                key={anime.mal_id}
                                anime={anime}
                                isFav={isFav}
                                onHeartClick={(e) => HandleHeartClick(e, animeData)}
                            />
                        );
                    })}
                </Grid>
            )}
        </Container>
    );
};
