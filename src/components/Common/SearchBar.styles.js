import styled from 'styled-components';

export const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
  }
`;

export const Select = styled.select`
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  option {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0.5rem;
  font-size: 0.9rem;
  width: 200px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 120px;
  }
`;

export const SearchButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.1);
  }
`;
