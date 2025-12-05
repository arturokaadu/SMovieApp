import { useEffect, useState } from "react";

import { Icon } from '@iconify/react';
import { AgeVerificationModal } from '../Common/AgeVerificationModal';
import { ClipPlayer } from '../Shared/ClipPlayer';
import { NSFWFilters } from './NSFWFilters';
import { HOT_MOMENTS } from '../../data/hotMoments';
import {
    NSFWContainer,
    WarningAlert,
    NSFWHeader,
    NSFWCard,
    NSFWImage,
    NSFWContent,
    NSFWTitle,
    NSFWText
} from './NSFW.styles';

const CATEGORIES = [
    { id: 'all', label: 'All', icon: '🔥', color: '#ef4444' },
    { id: 'Waifu', label: 'Waifus', icon: '💕', color: '#ec4899' },
    { id: 'Husbando', label: 'Husbandos', icon: '💎', color: '#3b82f6' }
];

export const HotCharactersPage = () => {
    const [isAgeVerified, setIsAgeVerified] = useState(false);
    const [selectedClip, setSelectedClip] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

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

    const filteredMoments = activeCategory === 'all'
        ? HOT_MOMENTS
        : HOT_MOMENTS.filter(m => m.category === activeCategory);

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
                    <strong>18+ Content</strong> - Contains mature themes and fanservice scenes.
                </WarningAlert>

                <NSFWHeader>
                    <Icon icon="bi:fire" />
                    🔥 Hottest Anime Characters
                </NSFWHeader>

                <NSFWFilters
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    padding: '1rem'
                }}>
                    {filteredMoments.map((moment, index) => (
                        <NSFWCard
                            key={moment.id}
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '12px',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedClip(moment)}
                        >
                            <div style={{ position: 'relative', height: '280px' }}>
                                <NSFWImage
                                    src={moment.thumbnail}
                                    alt={moment.title}
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

                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    background: moment.category === 'Waifu'
                                        ? 'linear-gradient(135deg, #ec4899, #db2777)'
                                        : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    zIndex: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}>
                                    {moment.category === 'Waifu' ? <Icon icon="bi:heart-fill" /> : <Icon icon="bi:gem" />}
                                    {moment.category}
                                </div>
                            </div>

                            <NSFWContent>
                                <NSFWTitle>{moment.characterName}</NSFWTitle>
                                <div style={{ color: '#00d4ff', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    {moment.animeTitle} - {moment.title}
                                </div>
                                <NSFWText>
                                    {moment.description}
                                </NSFWText>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                    {moment.tags.map((tag, idx) => (
                                        <span key={idx} style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            color: '#fbbf24',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem'
                                        }}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </NSFWContent>
                        </NSFWCard>
                    ))}
                </div>
            </NSFWContainer>
        </>
    );
};
