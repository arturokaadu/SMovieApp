import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 6rem;
`;

export const Header = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  i {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

export const Card = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
    z-index: 10;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  padding-top: 140%;
  overflow: hidden;
`;

export const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

export const Badge = styled.span`
  position: absolute;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  z-index: 2;
  
  ${({ position }) => position === 'top-right' && `
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
  `}
`;

export const CardContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, rgba(21, 31, 46, 0.9), rgba(21, 31, 46, 1));
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const Rating = styled.span`
  color: ${({ theme }) => theme.colors.text.accent};
  font-weight: bold;
  font-size: 0.9rem;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: ${({ theme }) => theme.colors.primary};

  img {
    width: 150px;
    height: 150px;
    object-fit: contain;
    margin-bottom: 1rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;
