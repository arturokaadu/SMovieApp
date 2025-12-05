import { useEffect, useState } from "react";

import { Icon } from '@iconify/react';
import { AgeVerificationModal } from '../Common/AgeVerificationModal';
import { ClipPlayer } from '../Shared/ClipPlayer';
import { BRUTAL_CLIPS } from '../../data/brutalClips';
import {
    NSFWContainer,
    WarningAlert,
    NSFWHeader,
    NSFWCard,
    NSFWImage,
    NSFWTitle,
    NSFWText
} from './NSFW.styles';

export const BrutalMomentsPage = () => {
    const [isAgeVerified, setIsAgeVerified] = useState(false);
    const [selectedClip, setSelectedClip] = useState(null);

    useEffect(() => {
        const verified = sessionStorage.getItem('isAgeVerified');
        if (verified === 'true') {
            setIsAgeVerified(true);
        }
    }, []);

    const handleVerification = () => {
        setIsAgeVerified(true);
        sessionStorage.setItem('isAgeVerified', 'true');
    };

    return (
        <>
            {!isAgeVerified && <AgeVerificationModal onVerify={handleVerification} />}
            {selectedClip && (
                <ClipPlayer
                    clip={selectedClip}
                    onClose={() => setSelectedClip(null)}
                />
            )}

            <NSFWContainer style={{ filter: !isAgeVerified ? 'blur(20px)' : 'none', transition: 'filter 0.5s ease' }}>
                <WarningAlert>
                    <Icon icon="bi:exclamation-triangle-fill" />
                    <strong>18+ Content</strong> - Contains extreme violence, gore, and disturbing imagery.
                </WarningAlert>

                <NSFWHeader>
                    <Icon icon="bi:droplet-fill" style={{ color: '#ef4444' }} />
                    🩸 Brutal Anime Moments
                </NSFWHeader>

                <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '2rem' }}>
                    Curated list of the most visceral and intense scenes in anime history.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {BRUTAL_CLIPS.map((clip) => (
                        <NSFWCard
                            key={clip.id}
                            style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                            onClick={() => setSelectedClip(clip)}
                        >
                            <div style={{ position: 'relative', height: '180px' }}>
                                <NSFWImage
                                    src={clip.thumbnail}
                                    alt={clip.title}
                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(0,0,0,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.2s',
                                    className: 'hover-overlay'
                                }}>
                                    <Icon icon="bi:play-circle-fill" style={{ fontSize: '3rem', color: 'white' }} />
                                </div>
                                <style>{`
                                    div:hover > .hover-overlay { opacity: 1 !important; }
                                `}</style>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <NSFWTitle style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{clip.title}</NSFWTitle>
                                <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    {clip.animeTitle}
                                </div>
                                <NSFWText style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                                    {clip.description}
                                </NSFWText>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {clip.tags.map((tag, idx) => (
                                        <span key={idx} style={{
                                            background: 'rgba(239, 68, 68, 0.2)',
                                            color: '#ef4444',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </NSFWCard>
                    ))}
                </div>
            </NSFWContainer>
        </>
    );
};
