import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const Container = styled.div`
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Header = styled.div`
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Title = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Content = styled.div`
  padding: 1.5rem;
  display: ${({ $expanded }) => $expanded ? 'block' : 'none'};
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${({ $active, theme }) => $active ? '#00d4ff' : 'rgba(255, 255, 255, 0.6)'};
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  position: relative;
  transition: color 0.2s;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.6rem;
    left: 0;
    right: 0;
    height: 2px;
    background: #00d4ff;
    opacity: ${({ $active }) => $active ? 1 : 0};
    transition: opacity 0.2s;
  }

  &:hover {
    color: #00d4ff;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ActorCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 0.75rem;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Role = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
`;

const PRIORITY_LANGUAGES = ['Japanese', 'English', 'Spanish'];

export const VoiceActors = ({ characters = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('Japanese');

  // Extract voice actors from characters
  const voiceActors = React.useMemo(() => {
    if (!characters || characters.length === 0) return [];

    const actors = [];
    const seen = new Set();

    characters.forEach(char => {
      if (char.voice_actors) {
        char.voice_actors.forEach(va => {
          if (va.language === activeTab) {
            const key = `${va.person.mal_id}-${char.character.mal_id}`;
            if (!seen.has(key)) {
              seen.add(key);
              actors.push({
                actor: va.person,
                character: char.character,
                role: char.role
              });
            }
          }
        });
      }
    });

    return actors;
  }, [characters, activeTab]);

  // Get available languages - organized by priority
  const { priorityLangs, otherLangs } = React.useMemo(() => {
    const allLangs = new Set();
    if (characters) {
      characters.forEach(char => {
        if (char.voice_actors) {
          char.voice_actors.forEach(va => {
            allLangs.add(va.language);
          });
        }
      });
    }

    const available = Array.from(allLangs);
    const priority = PRIORITY_LANGUAGES.filter(lang => available.includes(lang));
    const others = available.filter(lang => !PRIORITY_LANGUAGES.includes(lang)).sort();

    return { priorityLangs: priority, otherLangs: others };
  }, [characters]);

  if (!characters || characters.length === 0) return null;

  return (
    <Container>
      <Header onClick={() => setExpanded(!expanded)}>
        <Title>
          <Icon icon="bi:mic-fill" style={{ color: '#00d4ff' }} />
          Voice Actors
        </Title>
        <Icon icon={expanded ? "bi:chevron-up" : "bi:chevron-down"} />
      </Header>

      <Content $expanded={expanded}>
        <Tabs>
          {/* Priority Languages */}
          {priorityLangs.map(lang => (
            <Tab
              key={lang}
              $active={activeTab === lang}
              onClick={() => setActiveTab(lang)}
              style={{
                color: activeTab === lang ? '#00d4ff' :
                  lang === 'Japanese' ? '#ff6b6b' :
                    lang === 'English' ? '#4ecdc4' :
                      lang === 'Spanish' ? '#ffe66d' : 'rgba(255, 255, 255, 0.6)'
              }}
            >
              {lang === 'Japanese' && '🇯🇵 '}
              {lang === 'English' && '🇺🇸 '}
              {lang === 'Spanish' && '🇲🇽 '}
              {lang}
            </Tab>
          ))}

          {/* Separator if there are other languages */}
          {otherLangs.length > 0 && (
            <span style={{
              borderLeft: '1px solid rgba(255,255,255,0.2)',
              margin: '0 0.5rem',
              height: '24px',
              alignSelf: 'center'
            }} />
          )}

          {/* Other Languages */}
          {otherLangs.map(lang => (
            <Tab
              key={lang}
              $active={activeTab === lang}
              onClick={() => setActiveTab(lang)}
              style={{ fontSize: '0.9rem', opacity: activeTab === lang ? 1 : 0.6 }}
            >
              {lang}
            </Tab>
          ))}
        </Tabs>

        {voiceActors.length > 0 ? (
          <Grid>
            {voiceActors.slice(0, 12).map((item, index) => (
              <ActorCard key={`${item.actor.mal_id}-${index}`}>
                <ImageContainer>
                  <img src={item.actor.images?.jpg?.image_url} alt={item.actor.name} />
                </ImageContainer>
                <Info>
                  <Name>{item.actor.name}</Name>
                  <Role>as {item.character.name}</Role>
                </Info>
              </ActorCard>
            ))}
          </Grid>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>
            No voice actors found for this language.
          </div>
        )}

        {voiceActors.length > 12 && (
          <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            And {voiceActors.length - 12} more...
          </div>
        )}
      </Content>
    </Container>
  );
};
