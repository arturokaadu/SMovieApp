import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { searchAnime, getAnimeRecommendations } from '../../services/animeService';
import { AnimeCard } from "../Shared/AnimeCard";
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fbbf24, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const EngineContainer = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 100px;
`;

const SearchBox = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 2.5rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;
    outline: none;

    &:focus {
      border-color: #fbbf24;
    }
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #1a1c23;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  margin-top: 0.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
`;

const SearchResultItem = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  img {
    width: 40px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }

  span {
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const SeedItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-size: 0.9rem;

  button {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;

    &:hover {
      color: #ff0000;
    }
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${({ primary }) => primary ? 'linear-gradient(45deg, #fbbf24, #d97706)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ primary }) => primary ? '#000' : '#fff'};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const MatchScore = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fbbf24;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 10;
`;

export const RecommendationEngine = ({ favs }) => {
  const [seeds, setSeeds] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [generating, setGenerating] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const data = await searchAnime(value);
        setSearchResults(data.data || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const addSeed = (anime) => {
    if (seeds.length >= 8) return;
    if (seeds.find(s => s.mal_id === anime.mal_id)) return;

    setSeeds([...seeds, anime]);
    setQuery('');
    setSearchResults([]);
  };

  const removeSeed = (id) => {
    setSeeds(seeds.filter(s => s.mal_id !== id));
  };

  const loadFavorites = () => {
    // Take up to 8 random favorites
    const shuffled = [...favs].sort(() => 0.5 - Math.random());
    setSeeds(shuffled.slice(0, 8));
  };

  const generateRecommendations = async () => {
    if (seeds.length === 0) return;
    setGenerating(true);
    setRecommendations([]);

    try {
      // Fetch recommendations for each seed
      const allRecs = [];

      // Use Promise.all to fetch in parallel (limit concurrency if needed, but 8 is usually fine)
      const promises = seeds.map(seed => getAnimeRecommendations(seed.mal_id));
      const results = await Promise.all(promises);

      // Aggregate results
      const recMap = new Map();

      results.forEach((res, index) => {
        // res is array of recommendations for seeds[index]
        if (!res) return;

        res.slice(0, 10).forEach(rec => { // Take top 10 from each seed
          const entry = rec.entry;
          if (seeds.find(s => s.mal_id === entry.mal_id)) return; // Don't recommend seeds

          if (recMap.has(entry.mal_id)) {
            const existing = recMap.get(entry.mal_id);
            existing.score += 1;
            existing.sources.push(seeds[index].title);
          } else {
            recMap.set(entry.mal_id, {
              ...entry,
              score: 1,
              sources: [seeds[index].title]
            });
          }
        });
      });

      // Convert to array and sort by score
      const sortedRecs = Array.from(recMap.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 20); // Top 20

      setRecommendations(sortedRecs);

    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <PageContainer>
      <Content>
        <Header>
          <Title>Recommendation Engine</Title>
          <Subtitle>
            Build your perfect watchlist. Add up to 8 anime you love, and we'll find what you should watch next.
          </Subtitle>
        </Header>

        <EngineContainer>
          <Sidebar>
            <h3 style={{ marginBottom: '1rem' }}>Your Mix ({seeds.length}/8)</h3>

            <SearchBox>
              <input
                type="text"
                placeholder="Search to add..."
                value={query}
                onChange={handleSearch}
                disabled={seeds.length >= 8}
              />
              {seeds.length >= 8 && <small style={{ color: '#ef4444', marginTop: '0.5rem', display: 'block' }}>Max 8 anime selected</small>}

              {searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.map(anime => (
                    <SearchResultItem key={anime.mal_id} onClick={() => addSeed(anime)}>
                      <img src={anime.images?.jpg?.image_url} alt={anime.title} />
                      <span>{anime.title}</span>
                    </SearchResultItem>
                  ))}
                </SearchResults>
              )}
            </SearchBox>

            <SeedList>
              {seeds.map(seed => (
                <SeedItem key={seed.mal_id}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                    {seed.title}
                  </span>
                  <button onClick={() => removeSeed(seed.mal_id)}>
                    <Icon icon="bi:x-lg" />
                  </button>
                </SeedItem>
              ))}
              {seeds.length === 0 && (
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '1rem' }}>
                  No anime selected
                </div>
              )}
            </SeedList>

            <ActionButton primary onClick={generateRecommendations} disabled={seeds.length === 0 || generating}>
              {generating ? (
                <>
                  <Icon icon="eos-icons:loading" /> Analyzing...
                </>
              ) : (
                <>
                  <Icon icon="bi:magic" /> Generate
                </>
              )}
            </ActionButton>

            <ActionButton onClick={loadFavorites} disabled={favs.length === 0}>
              <Icon icon="bi:heart-fill" style={{ color: '#ef4444' }} /> Load from Favorites
            </ActionButton>

            <ActionButton onClick={() => setSeeds([])} disabled={seeds.length === 0}>
              <Icon icon="bi:trash" /> Clear All
            </ActionButton>
          </Sidebar>

          <div>
            {recommendations.length > 0 ? (
              <ResultsGrid>
                {recommendations.map(anime => (
                  <div key={anime.mal_id} style={{ position: 'relative' }}>
                    <AnimeCard
                      anime={anime}
                      isFav={false}
                      onHeartClick={(e) => e.preventDefault()}
                    />
                    <MatchScore>
                      <Icon icon="bi:lightning-fill" />
                      {anime.score > 1 ? 'High Match' : 'Match'}
                    </MatchScore>
                  </div>
                ))}
              </ResultsGrid>
            ) : (
              <div style={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.3)',
                border: '2px dashed rgba(255,255,255,0.1)',
                borderRadius: '12px'
              }}>
                <Icon icon="bi:film" style={{ fontSize: '3rem', marginBottom: '1rem' }} />
                <p>Add anime to the mix and click Generate</p>
              </div>
            )}
          </div>
        </EngineContainer>
      </Content>
    </PageContainer>
  );
};
