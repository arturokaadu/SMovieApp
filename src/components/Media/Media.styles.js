import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 6rem;
`;

export const Header = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  i {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SubHeader = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

export const CardBody = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h5`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Badge = styled.span`
  background: ${({ theme, variant }) => {
        switch (variant) {
            case 'success': return theme.colors.status.success;
            case 'warning': return theme.colors.status.warning;
            default: return theme.colors.primary;
        }
    }};
  color: ${({ theme, variant }) => variant === 'warning' ? '#000' : '#fff'};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
`;

export const ActionButton = styled(Link)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
