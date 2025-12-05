import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  border: 1px solid ${({ active, color }) => active ? color : 'rgba(255,255,255,0.2)'};
  background: ${({ active, color }) => active ? color : 'rgba(0,0,0,0.3)'};
  color: ${({ active }) => active ? 'white' : 'rgba(255,255,255,0.7)'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background: ${({ color }) => color};
    color: white;
    border-color: ${({ color }) => color};
    transform: translateY(-2px);
  }
`;

export const NSFWFilters = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <FilterContainer>
            {categories.map(cat => (
                <FilterButton
                    key={cat.id}
                    active={activeCategory === cat.id}
                    color={cat.color}
                    onClick={() => onCategoryChange(cat.id)}
                >
                    {cat.icon && <span style={{ marginRight: '0.5rem' }}>{cat.icon}</span>}
                    {cat.label}
                </FilterButton>
            ))}
        </FilterContainer>
    );
};
