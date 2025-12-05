import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  margin-top: 2rem;
`;

export const EpisodesColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-width: 0;
`;

export const EpisodeCard = styled.div`
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, background 0.2s;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const ThumbnailContainer = styled.div`
  width: 160px;
  min-width: 160px;
  height: 90px;
  position: relative;
  background: #000;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  ${EpisodeCard}:hover & img {
    opacity: 1;
  }
`;

export const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.2s;

  ${EpisodeCard}:hover & {
    opacity: 1;
  }
`;

export const EpisodeInfo = styled.div`
  padding: 0.75rem;
  padding-left: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
`;

export const EpisodeTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
`;

export const EpisodeMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

export const PageButton = styled.button`
  background: ${({ active }) => active ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ active }) => active ? '#000' : '#fff'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background: ${({ active }) => active ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 300px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ThemesSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const ThemeHeader = styled.h4`
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const ThemeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ThemeItem = styled.div`
  font-size: 0.85rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.6);
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const ThemeTitle = styled.span`
  color: #fff;
  font-weight: 500;
`;

export const ThemeArtist = styled.span`
  color: #a78bfa;
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-bottom: 1rem;
`;

export const LoadMoreButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NoEpisodesMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
`;

export const NextSectionHeader = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const NextSectionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(45deg, #00d4ff, #0055ff);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const RatingBadge = styled.span`
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
`;

export const EpisodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

export const WatchNextContainer = styled.div`
  margin-bottom: ${({ hasManga }) => hasManga ? '1.5rem' : '0'};
`;

export const WatchNextLabel = styled.strong`
  color: #00d4ff;
  font-size: 0.95rem;
  display: block;
`;

export const MangaSection = styled.div`
  margin-top: 1.5rem;
`;

export const MangaTitle = styled.strong`
  color: #00d4ff;
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.5rem;
`;

export const MangaLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #00d4ff;
  }
`;

export const MangaInfo = styled.p`
  margin-top: 0.75rem;
  font-size: 0.9rem;
  opacity: 0.85;
  line-height: 1.6;
  background: rgba(0, 212, 255, 0.1);
  padding: 0.75rem;
  border-radius: 6px;
`;

export const GuideLink = styled(Link)`
  color: #00d4ff;
  font-weight: bold;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Missing components added below

export const EpisodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionHeader = styled.h3`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SeasonAccordion = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.02);
`;

export const SeasonHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const SeasonTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SeasonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const SeasonStats = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
`;

export const ContentWrapper = styled.div`
  padding: 1rem;
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  color: #00d4ff;
  font-size: 1.5rem;
`;

export const EpisodeNumber = styled.span`
  font-weight: bold;
  color: #00d4ff;
  margin-right: 0.5rem;
`;

export const EpisodeTypeBadge = styled.span`
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${({ $bgColor }) => $bgColor || 'rgba(255, 255, 255, 0.1)'};
  color: ${({ $textColor }) => $textColor || 'rgba(255, 255, 255, 0.8)'};
  margin-left: 0.5rem;
`;

export const ContinuationSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ThemeLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const ThemeLink = styled.a`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #00d4ff;
  }
`;
