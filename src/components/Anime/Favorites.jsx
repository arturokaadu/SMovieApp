import { Link } from "react-router-dom";
import { AnimeCard } from "../Shared/AnimeCard";
import { Icon } from '@iconify/react';
import {
    Container,
    Header,
    EmptyState,
    Grid
} from './Favorites.styles';

export const Favorites = ({ addOrRemoveFromFavorites, favs }) => {

    if (!favs.length) {
        return (
            <Container>
                <Header>
                    <Icon icon="bi:heart-fill" /> My Favorites
                </Header>
                <EmptyState>
                    <Icon icon="bi:heart-break" />
                    <p>You haven't added any anime to your favorites yet.</p>
                    <Link to="/" style={{ color: '#00d4ff', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
                        Discover Anime
                    </Link>
                </EmptyState>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <Icon icon="bi:heart-fill" /> My Favorites
            </Header>

            <Grid>
                {favs.map((anime) => {
                    // Ensure we have correct data structure for AnimeCard
                    // Favorites might have different field names, so we map them to what AnimeCard expects
                    const animeForCard = {
                        mal_id: anime.id,
                        title: anime.title,
                        images: { jpg: { large_image_url: anime.img } },
                        status: anime.status || 'Finished', // Fallback
                        type: anime.type || 'TV',
                        score: anime.vote_average,
                        aired: { from: anime.release_date || null } // Approximate
                    };

                    const animeData = {
                        id: anime.id,
                        title: anime.title,
                        img: anime.img,
                        overview: anime.overview,
                        vote_average: anime.vote_average
                    };

                    return (
                        <AnimeCard
                            key={anime.id}
                            anime={animeForCard}
                            isFav={true}
                            onHeartClick={(e) => addOrRemoveFromFavorites(animeData)(e)}
                        />
                    );
                })}
            </Grid>
        </Container>
    );
};
