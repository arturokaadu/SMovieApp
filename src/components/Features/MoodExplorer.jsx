import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { Container } from '../Common/Header.styles'; // Reusing container

const MoodContainer = styled.div`
  padding: 4rem 1rem;
  background: ${({ theme }) => theme.colors.background};
  min-height: 80vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.2rem;
  margin-bottom: 3rem;
`;

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const MoodCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.08);
    border-color: ${({ color }) => color};
    box-shadow: 0 10px 30px -10px ${({ color }) => color}40;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ color }) => color};
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const Emoji = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  ${MoodCard}:hover & {
    transform: scale(1.2) rotate(10deg);
  }
`;

const Label = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

const MOODS = [
    {
        id: 'hype',
        emoji: '🔥',
        label: 'Hype Me Up',
        desc: 'Adrenaline, epic fights, and shonen spirit.',
        color: '#ef4444', // Red
        genres: '1,27' // Action, Shonen
    },
    {
        id: 'cry',
        emoji: '😢',
        label: 'I Need a Cry',
        desc: 'Emotional stories, tragedy, and heartbreak.',
        color: '#3b82f6', // Blue
        genres: '8,40' // Drama, Psychological
    },
    {
        id: 'love',
        emoji: '🥰',
        label: 'Feel the Love',
        desc: 'Romance, wholesome moments, and butterflies.',
        color: '#ec4899', // Pink
        genres: '22,36' // Romance, Slice of Life
    },
    {
        id: 'chill',
        emoji: '🍃',
        label: 'Just Chill',
        desc: 'Relaxing vibes, slower pace, and comfort.',
        color: '#10b981', // Green
        genres: '36' // Slice of Life
    },
    {
        id: 'dark',
        emoji: '🌑',
        label: 'Go Dark',
        desc: 'Psychological thrillers, mystery, and horror.',
        color: '#8b5cf6', // Purple
        genres: '14,7' // Horror, Mystery
    },
    {
        id: 'laugh',
        emoji: '🤣',
        label: 'Make Me Laugh',
        desc: 'Pure comedy and hilarious situations.',
        color: '#f59e0b', // Yellow
        genres: '4' // Comedy
    }
];

export const MoodExplorer = () => {
    const navigate = useNavigate();

    const handleMoodSelect = (mood) => {
        // Navigate to search results with pre-selected genre/mood
        // We'll reuse the genre grid or create a specific results view.
        // For now, let's route to a filtered search page.
        navigate(`/resultados?genre=${mood.genres}&title=${encodeURIComponent(mood.label)}`);
    };

    return (
        <MoodContainer>
            <Container style={{ flexDirection: 'column' }}>
                <Title>How are you feeling today?</Title>
                <Subtitle>Discover anime that matches your current vibe.</Subtitle>

                <MoodGrid>
                    {MOODS.map((mood) => (
                        <MoodCard key={mood.id} color={mood.color} onClick={() => handleMoodSelect(mood)}>
                            <Emoji>{mood.emoji}</Emoji>
                            <Label>{mood.label}</Label>
                            <Description>{mood.desc}</Description>
                        </MoodCard>
                    ))}
                </MoodGrid>
            </Container>
        </MoodContainer>
    );
};
