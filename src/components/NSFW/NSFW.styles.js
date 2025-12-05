import styled from 'styled-components';

export const NSFWContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 6rem;
`;

export const WarningAlert = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.status.error};
  color: ${({ theme }) => theme.colors.status.error};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  i {
    font-size: 1.5rem;
  }
`;

export const NSFWHeader = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.status.error};
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
`;

export const NSFWCard = styled.div`
  background: rgba(20, 10, 10, 0.9);
  border: 1px solid ${({ theme }) => theme.colors.status.error};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
  }
`;

export const NSFWImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  filter: grayscale(20%) contrast(110%);
  transition: filter 0.3s ease;

  ${NSFWCard}:hover & {
    filter: grayscale(0%) contrast(120%);
  }
`;

export const NSFWContent = styled.div`
  padding: 1.5rem;
`;

export const NSFWTitle = styled.h5`
  color: white;
  margin-bottom: 0.5rem;
`;

export const NSFWText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const NSFWButton = styled.a`
  display: block;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.status.error};
  color: ${({ theme }) => theme.colors.status.error};
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.status.error};
    color: white;
  }
`;
