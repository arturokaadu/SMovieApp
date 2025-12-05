import React from 'react';
import { Soundtracks } from './Soundtracks';
import { Icon } from '@iconify/react';
import { Container, Header } from './Media.styles';

export const SoundtracksPage = () => {
    const popularOSTs = [
        { title: "Attack on Titan", theme: { openings: ["Guren no Yumiya"], endings: ["Utsukushiki Zankoku na Sekai"] } },
        { title: "Naruto Shippuden", theme: { openings: ["Blue Bird"], endings: ["Broken Youth"] } },
        { title: "Demon Slayer", theme: { openings: ["Gurenge"], endings: ["From the Edge"] } },
        { title: "Jujutsu Kaisen", theme: { openings: ["Kaikai Kitan"], endings: ["Lost in Paradise"] } },
    ];

    return (
        <Container>
            <Header>
                <Icon icon="bi:disc" />
                Anime Soundtracks Hub
            </Header>

            <div style={{ display: 'grid', gap: '3rem' }}>
                {popularOSTs.map((anime, index) => (
                    <div key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px' }}>
                        <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>{anime.title}</h2>
                        <Soundtracks animeTitle={anime.title} themes={anime.theme} />
                    </div>
                ))}
            </div>
        </Container>
    );
};
