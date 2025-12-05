import { useEffect, useState } from "react";
import { getTopAnime } from "../../services/animeService";
import { Icon } from '@iconify/react';
import {
    Container,
    Header,
    SubHeader,
    Grid,
    Card,
    CardImage,
    CardBody,
    CardTitle,
    CardFooter,
    Badge,
    ActionButton
} from './Media.styles';

export const RecommendationsPage = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const data = await getTopAnime(1, 'favorite');
                setAnimeList(data.data.slice(0, 12));
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#00d4ff' }}>
                <Icon icon="eos-icons:loading" width="60" />
            </div>
        );
    }

    return (
        <Container>
            <Header>
                <Icon icon="bi:gem" />
                Hidden Gems & Recommendations
            </Header>
            <SubHeader>Curated list of highly rated anime you might have missed.</SubHeader>

            <Grid>
                {animeList.map((anime) => (
                    <Card key={anime.mal_id}>
                        <div style={{ position: 'relative' }}>
                            <CardImage src={anime.images.jpg.large_image_url} alt={anime.title} />
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <Badge variant={anime.status === 'Currently Airing' ? 'success' : 'primary'}>
                                    {anime.status === 'Currently Airing' ? 'Airing' : anime.status}
                                </Badge>
                            </div>
                        </div>
                        <CardBody>
                            <CardTitle title={anime.title}>{anime.title}</CardTitle>
                            <CardFooter>
                                <Badge variant="warning">
                                    <Icon icon="bi:star-fill" style={{ marginRight: '4px' }} />
                                    {anime.score}
                                </Badge>
                                <ActionButton to={`/detalle?id=${anime.mal_id}`}>
                                    View Details
                                </ActionButton>
                            </CardFooter>
                        </CardBody>
                    </Card>
                ))}
            </Grid>
        </Container>
    );
};
