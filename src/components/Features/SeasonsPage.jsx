import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getSeasonAnime } from '../../services/animeService';
import { groupAnimeByBase } from '../../utils/animeGrouping';
import { FeatureContainer, FeatureHeader } from './Features.styles';
import { AnimeCard } from '../Shared/AnimeCard';
import { useAuth } from '../Context/authContext';
import {
    Grid,
    LoadingContainer
} from '../Anime/Home.styles';

const SeasonSelector = ({ currentSeason, currentYear, onSeasonChange, onYearChange }) => {
    const seasons = ['winter', 'spring', 'summer', 'fall'];
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {seasons.map(season => (
                <button
                    key={season}
                    onClick={() => onSeasonChange(season)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: currentSeason === season ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)',
                        color: currentSeason === season ? '#0b0c15' : '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {season === 'winter' && '❄️'}
                    {season === 'spring' && '🌸'}
                    {season === 'summer' && '☀️'}
                    {season === 'fall' && '🍂'}
                    {' '}{season.charAt(0).toUpperCase() + season.slice(1)}
                </button>
            ))}
            <select
                value={currentYear}
                onChange={(e) => onYearChange(parseInt(e.target.value))}
                style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
};

export const SeasonsPage = ({ favs, addOrRemoveFromFavorites }) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const defaultSeason = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'fall', 'fall', 'fall', 'winter'][currentMonth];

    const [season, setSeason] = useState(defaultSeason);
    const [year, setYear] = useState(currentDate.getFullYear());
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeasonAnime = async () => {
            setLoading(true);
            try {
                const data = await getSeasonAnime(year, season);
                // Apply grouping to consolidate seasons into single entries
                const grouped = groupAnimeByBase(data.data);
                // Combine series and movies, limit to 24
                const allAnime = [...grouped.series, ...grouped.movies].slice(0, 24);
                setAnimeList(allAnime);
            } catch (error) {
                console.error("Error fetching seasonal anime:", error);
                toast.error("Error loading seasonal anime");
            } finally {
                setLoading(false);
            }
        };

        fetchSeasonAnime();
    }, [season, year]);

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
        <FeatureContainer>
            <FeatureHeader>
                <Icon icon="bi:calendar-event" /> Seasonal Anime
            </FeatureHeader>

            <SeasonSelector
                currentSeason={season}
                currentYear={year}
                onSeasonChange={setSeason}
                onYearChange={setYear}
            />

            <h3 style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', textTransform: 'capitalize' }}>
                {season} {year}
            </h3>

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
        </FeatureContainer>
    );
};
