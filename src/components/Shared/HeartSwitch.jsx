import React from 'react';
import styled from 'styled-components';

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ size }) => size === 'sm' ? '1.2rem' : '1.5rem'};
  padding: 0;
  color: ${({ checked, activeColor, inactiveColor }) =>
        checked ? activeColor : inactiveColor};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.9);
  }
`;

export const HeartSwitch = ({ checked, size, activeColor, inactiveColor, onChange, ...props }) => {
    return (
        <HeartButton
            checked={checked}
            size={size}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            onClick={onChange}
            {...props}
        >
            {checked ? '❤️' : '🤍'}
        </HeartButton>
    );
};
