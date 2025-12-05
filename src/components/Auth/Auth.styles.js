import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('https://wallpaperaccess.com/full/19921.jpg');
  background-size: cover;
  background-position: center;
`;

export const AuthCard = styled.div`
  background: rgba(16, 20, 30, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  i {
    position: absolute;
    left: 1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.small};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const Button = styled.button`
  background: ${({ theme, variant }) => variant === 'outline' ? 'transparent' : theme.colors.primary};
  color: ${({ theme, variant }) => variant === 'outline' ? theme.colors.text.primary : theme.colors.background};
  border: ${({ theme, variant }) => variant === 'outline' ? `1px solid ${theme.colors.text.secondary}` : 'none'};
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme, variant }) => variant === 'outline' ? 'rgba(255,255,255,0.1)' : theme.colors.secondary};
    color: white;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.8rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  span {
    padding: 0 1rem;
  }
`;

export const AuthLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
  display: block;
  margin-top: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.status.error};
  color: ${({ theme }) => theme.colors.status.error};
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.9rem;
  text-align: center;
`;
