import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeroSection = styled.div`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: flex-end;
  padding: 4rem 2rem;
  margin-bottom: 4rem;
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(11, 12, 21, 0.3) 0%, rgba(11, 12, 21, 0.9) 80%, #0b0c15 100%);
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const PosterImage = styled.img`
  width: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 200px;
  }
`;

export const InfoColumn = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
`;

export const MetaBadges = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

export const Badge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: bold;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  
  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'success': return theme.colors.status.success;
      case 'warning': return theme.colors.status.warning;
      case 'info': return theme.colors.status.info;
      case 'purple': return '#8b5cf6';
      default: return theme.colors.primary;
    }
  }};
`;

export const Synopsis = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`;

export const Section = styled.section`
  margin-bottom: 4rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AlertBox = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: white;

  i {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.status.info};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

export const CharacterCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin: 1rem auto;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  h4 {
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    padding-bottom: 1rem;
  }
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
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

export const RelationsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export const RelationItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};

  h6 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const RelationLink = styled(Link)`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.85rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;
