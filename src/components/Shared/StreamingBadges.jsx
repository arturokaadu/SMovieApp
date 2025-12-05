import styled from 'styled-components';
import { Icon } from '@iconify/react';

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: ${props => props.$compact ? '0' : '1rem'};
`;

const Badge = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$color || 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
    border-color: ${props => props.$color || 'white'};
  }
`;

const PlatformIcon = styled(Icon)`
  font-size: 1.2rem;
`;

const getPlatformConfig = (site) => {
  const lowerSite = site.toLowerCase();
  if (lowerSite.includes('crunchyroll')) return { icon: 'simple-icons:crunchyroll', color: '#F47521' };
  if (lowerSite.includes('netflix')) return { icon: 'simple-icons:netflix', color: '#E50914' };
  if (lowerSite.includes('hulu')) return { icon: 'simple-icons:hulu', color: '#1CE783' };
  if (lowerSite.includes('amazon')) return { icon: 'simple-icons:amazonprime', color: '#00A8E1' };
  if (lowerSite.includes('disney')) return { icon: 'simple-icons:disneyplus', color: '#113CCF' };
  if (lowerSite.includes('hidive')) return { icon: 'simple-icons:hidive', color: '#00AEEF' };
  if (lowerSite.includes('youtube')) return { icon: 'simple-icons:youtube', color: '#FF0000' };
  if (lowerSite.includes('bilibili')) return { icon: 'simple-icons:bilibili', color: '#00A1D6' };
  return { icon: 'bi:play-circle-fill', color: '#00d4ff' };
};

export const StreamingBadges = ({ links, licensors, title, compact = false }) => {
  // 1. If explicit links exist (from Details page), use them
  if (links && links.length > 0) {
    const streamingSites = ['Crunchyroll', 'Netflix', 'Hulu', 'Amazon Prime Video', 'Disney+', 'HIDIVE', 'YouTube', 'Bilibili'];
    const validLinks = links.filter(link => streamingSites.some(site => link.site.includes(site)));

    if (validLinks.length > 0) {
      return (
        <BadgeContainer $compact={compact}>
          {validLinks.map((link, index) => {
            const config = getPlatformConfig(link.site);
            return (
              <Badge
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                $color={config.color}
                style={compact ? { padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px' } : {}}
              >
                <PlatformIcon icon={config.icon} style={{ color: config.color, fontSize: compact ? '0.9rem' : '1.2rem' }} />
                {!compact && link.site}
              </Badge>
            );
          })}
        </BadgeContainer>
      );
    }
  }

  // 2. If no links, try to infer from Licensors (for Cards)
  if (licensors && licensors.length > 0) {
    const inferred = [];
    const seen = new Set();

    licensors.forEach(lic => {
      const name = lic.name.toLowerCase();

      const addPlatform = (site, url) => {
        if (!seen.has(site)) {
          inferred.push({ site, url });
          seen.add(site);
        }
      };

      if (name.includes('crunchyroll') || name.includes('funimation')) {
        addPlatform('Crunchyroll', `https://www.crunchyroll.com/search?q=${encodeURIComponent(title)}`);
      }
      if (name.includes('netflix')) {
        addPlatform('Netflix', `https://www.netflix.com/search?q=${encodeURIComponent(title)}`);
      }
      if (name.includes('sentai') || name.includes('hidive')) {
        addPlatform('HIDIVE', `https://www.hidive.com/search?q=${encodeURIComponent(title)}`);
      }
      if (name.includes('disney')) {
        addPlatform('Disney+', `https://www.disneyplus.com/search?q=${encodeURIComponent(title)}`);
      }
      if (name.includes('amazon')) {
        addPlatform('Amazon Prime', `https://www.amazon.com/s?k=${encodeURIComponent(title)}&i=instant-video`);
      }
      if (name.includes('hulu') || name.includes('viz media')) {
        addPlatform('Hulu', `https://www.hulu.com/search?q=${encodeURIComponent(title)}`);
      }
      if (name.includes('bilibili')) {
        addPlatform('Bilibili', `https://www.bilibili.tv/en/search-result?q=${encodeURIComponent(title)}`);
      }
    });

    if (inferred.length > 0) {
      return (
        <BadgeContainer $compact={compact}>
          {inferred.map((link, index) => {
            const config = getPlatformConfig(link.site);
            return (
              <Badge
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                $color={config.color}
                style={compact ? { padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px' } : {}}
                onClick={(e) => e.stopPropagation()}
              >
                <PlatformIcon icon={config.icon} style={{ color: config.color, fontSize: compact ? '0.9rem' : '1.2rem' }} />
                {!compact && link.site}
              </Badge>
            );
          })}
        </BadgeContainer>
      );
    }
  }

  return null;
};
