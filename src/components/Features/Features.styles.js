import styled from 'styled-components';

export const FeatureContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 6rem;
`;

export const FeatureHeader = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const Placeholder = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 4rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};

  i {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: block;
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.primary};
  }

  h4 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
`;
