import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background: rgba(11, 12, 21, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  transition: all 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Brand = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  i {
    font-size: 1.8rem;
  }
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.surface};
    padding: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const MenuItem = styled.li`
  position: relative;
`;

export const MenuLink = styled(Link)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover, &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  i {
    font-size: 1.1rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1rem;
  min-width: 200px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
  margin-top: ${({ $isOpen }) => $isOpen ? '0' : '1rem'};
  z-index: 1001;

  /* Also show on hover for desktop */
  ${MenuItem}:hover & {
    opacity: 1;
    visibility: visible;
    margin-top: 0;
  }
`;

export const UserAvatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
`;
