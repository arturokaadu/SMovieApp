import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const PlayerContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  background: #0b0c15;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(239, 68, 68, 0.3);
  display: flex;
  flex-direction: column;

  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  animation: slideUp 0.3s ease;
`;

const Header = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #111;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  background: black;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const FallbackContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: #000;
`;

const InfoSection = styled.div`
  padding: 1.5rem;
  background: #111;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.6;
`;

const SearchButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #ef4444;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: #dc2626;
  }
`;

export const ClipPlayer = ({ clip, onClose }) => {
    if (!clip) return null;

    const { videoId, searchQuery, title, description, animeTitle } = clip;
    const hasVideo = videoId && videoId !== "video_id_here";

    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery || `${animeTitle} ${title}`)}`;

    return (
        <Overlay onClick={onClose}>
            <PlayerContainer onClick={e => e.stopPropagation()}>
                <Header>
                    <Title>
                        <Icon icon="bi:play-btn-fill" style={{ color: '#ef4444' }} />
                        {title}
                    </Title>
                    <CloseButton onClick={onClose}>
                        <Icon icon="bi:x-lg" />
                    </CloseButton>
                </Header>

                <VideoWrapper>
                    {hasVideo ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <FallbackContainer>
                            <Icon icon="bi:youtube" style={{ fontSize: '4rem', color: '#ef4444', marginBottom: '1rem' }} />
                            <h4 style={{ margin: '0 0 1rem 0' }}>Video Unavailable for Embed</h4>
                            <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
                                Use the button below to search for this scene directly on YouTube.
                            </p>
                            <SearchButton href={searchUrl} target="_blank" rel="noopener noreferrer">
                                <Icon icon="bi:search" /> Search "{searchQuery || title}"
                            </SearchButton>
                        </FallbackContainer>
                    )}
                </VideoWrapper>

                <InfoSection>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                        <div>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>{animeTitle}</h4>
                            <Description>{description}</Description>
                        </div>
                        {!hasVideo && (
                            <div style={{ fontSize: '0.8rem', color: '#ef4444', border: '1px solid #ef4444', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                External Search
                            </div>
                        )}
                        {hasVideo && (
                            <SearchButton
                                href={searchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginTop: 0, padding: '0.5rem 1rem', fontSize: '0.9rem', background: 'rgba(255,255,255,0.1)' }}
                            >
                                <Icon icon="bi:box-arrow-up-right" /> Open in YT
                            </SearchButton>
                        )}
                    </div>
                </InfoSection>
            </PlayerContainer>
        </Overlay>
    );
};
