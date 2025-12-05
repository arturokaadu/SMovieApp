import React from 'react';
import { Icon } from '@iconify/react';
import { Container, Header, PlaceholderPanel } from './HistoryPage.styles';

export const HistoryPage = () => {
    return (
        <Container>
            <Header>
                <Icon icon="bi:clock-history" /> Watch History
            </Header>
            <PlaceholderPanel>
                <Icon icon="bi:clock-history" />
                <h4>Your watch history will appear here.</h4>
                <p>Start watching anime to build your history!</p>
            </PlaceholderPanel>
        </Container>
    );
};
