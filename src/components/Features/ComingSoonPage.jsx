import React from 'react';
import { Icon } from '@iconify/react';
import { FeatureContainer, FeatureHeader, Placeholder } from './Features.styles';

export const ComingSoonPage = () => {
    return (
        <FeatureContainer>
            <FeatureHeader>
                <Icon icon="bi:hourglass-split" /> Coming Soon
            </FeatureHeader>
            <Placeholder>
                <Icon icon="bi:hourglass-split" />
                <h4>Future Releases</h4>
                <p>Stay updated with the most anticipated anime announcements.</p>
                <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>Coming Soon!</p>
            </Placeholder>
        </FeatureContainer>
    );
};
