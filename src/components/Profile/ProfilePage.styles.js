import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 6rem;
`;

export const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.text.primary};

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 2rem;
  }
`;

export const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.status.error};
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
    transform: translateY(-2px);
  }
`;

export const Section = styled.section`
  margin-bottom: 4rem;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CardTitle = styled.h5`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingInfo = styled.div`
  strong {
    display: block;
    margin-bottom: 0.25rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SearchInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  padding: 0 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const CharacterCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CharacterImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const CharacterName = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: ${({ theme }) => theme.colors.status.error};
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${CharacterCard}:hover & {
    opacity: 1;
  }
`;

export const RankBadge = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
`;
