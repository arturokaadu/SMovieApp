import React from 'react';
import { Icon } from '@iconify/react';
import { FeatureContainer, FeatureHeader, Placeholder } from './Features.styles';

export const AnimeInCinemasPage = () => {
    return (
        <FeatureContainer>
            <FeatureHeader>
                <Icon icon="bi:film" /> In Cinemas
            </FeatureHeader>
            <Placeholder>
                <Icon icon="bi:film" />
                <h4>Now Showing</h4>
                <p>Find anime movies currently playing in theaters near you.</p>
                <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>Coming Soon!</p>
            </Placeholder>
        </FeatureContainer>
    );
};
